{
  "name": "vr4deaf.org-|-deaf-first-workforce-ecosystem",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "@google/genai": "1.34.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1PQ5BMBMkSJfRnbm8QBtw6DbOnbXmF0Bt

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "types": [
      "node"
    ],
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

GEMINI_API_KEY=PLACEHOLDER_API_KEY

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>VR4DEAF.org - Deaf-First Pathways to Careers & Community</title>
  <meta name="title" content="VR4DEAF.org - Deaf-First Pathways to Careers & Community">
  <meta name="description" content="VR4Deaf.org is the leading ecosystem for vocational access and vendor networking for the DHH community. Access Career Programs, Learning Resources, and Networking.">
  <meta name="keywords" content="VR4Deaf, Deaf jobs, DHH career programs, ASL learning resources, deaf vendor network, deaf entrepreneurship">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
    
    :root {
      --vr-navy: #003366;
      --vr-cyan: #01AEF0;
      --vr-yellow: #FFB800;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: #fcfdfd;
      color: #1e293b;
    }

    .flag-gradient {
      background: linear-gradient(135deg, var(--vr-navy) 0%, #001a33 100%);
    }

    .animate-in {
      animation: fadeIn 0.4s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Custom Focus State */
    :focus {
      outline: 3px solid var(--vr-cyan);
      outline-offset: 2px;
    }
  </style>
  <script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@19.0.0",
    "react-dom": "https://esm.sh/react-dom@19.0.0",
    "react-dom/client": "https://esm.sh/react-dom@19.0.0/client",
    "@google/genai": "https://esm.sh/@google/genai@1.34.0",
    "react-dom/": "https://esm.sh/react-dom@^19.2.3/",
    "react/": "https://esm.sh/react@^19.2.3/"
  }
}
</script>
<link rel="stylesheet" href="/index.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="index.tsx"></script>
<script type="module" src="/index.tsx"></script>
</body>
</html>


import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Types & Interfaces ---
type Path = '/' | '/dashboard' | '/career' | '/learning' | '/community' | '/support' | '/about' | '/success-stories' | '/blog' | '/contact' | '/vault' | '/matches';

interface UserProfile {
  id: string;
  name: string;
  skills: string[];
  track: 'Employment' | 'Entrepreneurship';
  preferences: {
    communicationStyle: 'ASL-First' | 'Written-Heavy' | 'Visual-Primary' | 'Bilingual';
    accessibilityNeeds: string[]; 
    canineCompanion: boolean; 
  };
}

interface JobMatch {
  id: string;
  title: string;
  company: string;
  matchScore: number;
  vuriInsight: string; // AI-generated DHH-specific reasoning
  accessibilityFeatures: string[];
  salary: string;
  location: string;
  feedback?: 'positive' | 'negative' | null;
}

// --- UI Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, size = 'md' }: any) => {
  const base = "rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 text-sm whitespace-nowrap";
  const variants: any = {
    primary: "bg-[#01AEF0] text-white hover:opacity-90 disabled:bg-slate-300 shadow-sm",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 border",
    outline: "border-2 border-[#01AEF0] text-[#01AEF0] hover:bg-blue-50",
    navy: "bg-[#003366] text-white hover:bg-[#002244] shadow-md",
    yellow: "bg-[#FFB800] text-[#003366] hover:bg-[#E6A600] shadow-md",
    ghost: "text-slate-500 hover:bg-slate-100"
  };
  const sizes: any = { sm: "px-3 py-1.5", md: "px-5 py-2.5", lg: "px-8 py-4" };
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

const Badge = ({ children, variant = 'blue' }: any) => {
  const colors: any = {
    blue: "bg-blue-50 text-[#01AEF0] border-[#01AEF0]/20",
    green: "bg-green-50 text-green-700 border-green-100",
    yellow: "bg-[#FFF9E6] text-[#FFB800] border-[#FFB800]/20",
    navy: "bg-blue-50 text-[#003366] border-[#003366]/20",
  };
  return <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${colors[variant]}`}>{children}</span>;
};

// --- Main Application ---

const App = () => {
  const [path, setPath] = useState<Path>('/');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // VURI AI ENGINE: Specialized Prompting for DHH Context
  const generateVURIMatches = async (profile: UserProfile) => {
    setIsLoading(true);
    try {
      const prompt = `
        Act as a VR (Vocational Rehabilitation) Expert Counselor specializing in the Deaf and Hard-of-Hearing (DHH) community.
        
        USER PROFILE:
        - Name: ${profile.name}
        - Primary Communication: ${profile.preferences.communicationStyle}
        - Skills: ${profile.skills.join(', ')}
        - Accessibility Needs: ${profile.preferences.accessibilityNeeds.join(', ')}
        - Support: ${profile.preferences.canineCompanion ? 'Has Service Animal' : 'No Service Animal'}

        TASK:
        Generate 3 high-quality job matches. For each match, provide a "VURI Insight" that explicitly explains why this job is "Deaf-Friendly" or "Hearing Not Required" (HNR) based on the user's communication style. Focus on asynchronous workflows, visual communication, and accessibility.

        RETURN JSON:
        Array<{
          id: string,
          title: string,
          company: string,
          matchScore: number (0-100),
          vuriInsight: string (Deaf-specific reasoning),
          accessibilityFeatures: string[],
          salary: string,
          location: string
        }>
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          responseMimeType: 'application/json',
          temperature: 0.7 
        }
      });
      
      const data = JSON.parse(response.text || '[]');
      setMatches(data.map((m: any) => ({ ...m, feedback: null })));
    } catch (error) {
      console.error("VURI Engine Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    const mockUser: UserProfile = {
      id: '1', 
      name: 'Alex Rivera', 
      skills: ['Frontend Engineering', 'Accessibility Audit', 'Project Management'], 
      track: 'Employment',
      preferences: { 
        communicationStyle: 'ASL-First', 
        accessibilityNeeds: ['Visual Emergency Alerts', 'Remote-First', 'Captioning for all Meetings'],
        canineCompanion: true 
      }
    };
    setUser(mockUser);
    generateVURIMatches(mockUser);
    setPath('/dashboard');
  };

  const handleFeedback = (id: string, type: 'positive' | 'negative') => {
    setMatches(prev => prev.map(m => m.id === id ? { ...m, feedback: type } : m));
  };

  const renderNav = () => (
    <header className="bg-white border-b sticky top-0 z-[60] h-20 flex items-center px-4 shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="flex flex-col cursor-pointer" onClick={() => setPath('/')}>
          <div className="flex items-center gap-1">
             <span className="text-2xl font-black text-[#003366] tracking-tighter">VR4DEAF</span>
             <span className="text-lg font-bold text-[#003366]/60">.org</span>
          </div>
          <span className="text-[10px] font-bold text-[#01AEF0] uppercase tracking-[0.15em] -mt-1">Vocational Access • Vendor Network</span>
        </div>
        
        <nav className="hidden lg:flex gap-6 items-center">
          {user && (
            <>
              <button onClick={() => setPath('/dashboard')} className={`text-[11px] font-black uppercase tracking-widest ${path === '/dashboard' ? 'text-[#01AEF0]' : 'text-slate-400'}`}>Dashboard</button>
              <button onClick={() => setPath('/matches')} className={`text-[11px] font-black uppercase tracking-widest ${path === '/matches' ? 'text-[#01AEF0]' : 'text-slate-400'}`}>VURI Matches</button>
            </>
          )}
          <button onClick={() => setPath('/career')} className={`text-[11px] font-black uppercase tracking-widest ${path === '/career' ? 'text-[#01AEF0]' : 'text-slate-400'}`}>Programs</button>
          <button onClick={() => setPath('/community')} className={`text-[11px] font-black uppercase tracking-widest ${path === '/community' ? 'text-[#01AEF0]' : 'text-slate-400'}`}>Community</button>
          <button onClick={() => setPath('/learning')} className={`text-[11px] font-black uppercase tracking-widest ${path === '/learning' ? 'text-[#01AEF0]' : 'text-slate-400'}`}>Resources</button>
          <div className="h-6 w-[1px] bg-slate-200" />
          {user ? (
            <div className="flex items-center gap-3">
               <div className="text-right">
                  <p className="text-[10px] font-black text-[#003366]">{user.name}</p>
                  <p className="text-[8px] text-[#01AEF0] font-bold">ASL-First User</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-[#003366] flex items-center justify-center text-white font-black border-2 border-[#FFB800]">AR</div>
            </div>
          ) : (
            <Button variant="yellow" size="sm" onClick={handleLogin}>Log In</Button>
          )}
        </nav>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex flex-col font-sans">
      {renderNav()}
      <div className="flex-1">
        {path === '/' && (
          <main className="flag-gradient py-48 text-center text-white px-4 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
             <div className="relative z-10 max-w-5xl mx-auto animate-in">
                <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full border border-white/20 mb-12">
                   <div className="w-2 h-2 bg-[#FFB800] rounded-full animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/90">Deaf-First Pathways to Careers & Community</span>
                </div>
                <h1 className="text-8xl font-black tracking-tighter leading-[0.9] mb-8">Visible<br/><span className="text-[#01AEF0]">Success.</span></h1>
                <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">The unified digital hub for Deaf-First programs, learning resources, and a premier vendor network dedicated to vocational success.</p>
                <div className="flex flex-wrap justify-center gap-6">
                   <Button variant="yellow" size="lg" className="px-12" onClick={handleLogin}>Get Started</Button>
                   <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10 px-12" onClick={() => setPath('/about')}>Learn More</Button>
                </div>
             </div>
          </main>
        )}

        {path === '/dashboard' && (
          <main className="max-w-7xl mx-auto p-8 animate-in">
             <div className="flex justify-between items-center mb-12">
                <div>
                   <Badge variant="navy">User Dashboard</Badge>
                   <h1 className="text-4xl font-black text-[#003366] mt-4">Hello, {user?.name}.</h1>
                   <p className="text-slate-500 font-medium">Your pathway is synchronized with <span className="text-[#01AEF0] font-bold">VURI Engine v2.0</span></p>
                </div>
                <Button variant="navy" onClick={() => setPath('/matches')}>View New Matches ({matches.length})</Button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border-2 border-[#01AEF0]/10 rounded-3xl p-8 shadow-sm">
                   <h3 className="text-sm font-black text-[#003366] uppercase tracking-widest mb-6">Profile Synthesis</h3>
                   <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                         <span className="text-xs font-bold text-slate-500 uppercase">Primary Modality</span>
                         <Badge variant="blue">{user?.preferences.communicationStyle}</Badge>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl">
                         <span className="text-xs font-bold text-slate-500 uppercase block mb-3">Accessibility Overlays</span>
                         <div className="flex flex-wrap gap-2">
                            {user?.preferences.accessibilityNeeds.map(need => (
                              <span key={need} className="px-3 py-1 bg-[#01AEF0]/10 text-[#01AEF0] text-[10px] font-bold rounded-lg">{need}</span>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-[#003366] rounded-3xl p-8 text-white relative overflow-hidden">
                   <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white/50">VURI Learning Status</h3>
                   <div className="flex items-center gap-6">
                      <div className="text-5xl font-black text-[#FFB800]">92%</div>
                      <div>
                         <p className="text-xs font-bold text-white/70">Algorithm Confidence</p>
                         <p className="text-[10px] text-white/40 mt-1 uppercase">Based on your recent feedback</p>
                      </div>
                   </div>
                   <i className="fas fa-brain absolute -bottom-10 -right-10 text-[180px] text-white/5"></i>
                </div>
             </div>
          </main>
        )}

        {path === '/matches' && (
          <main className="max-w-7xl mx-auto p-8 animate-in">
             <div className="flex justify-between items-end mb-12">
                <div>
                   <Badge variant="yellow">HNR Board</Badge>
                   <h1 className="text-4xl font-black text-[#003366] mt-4">VURI Smart Matches</h1>
                   <p className="text-slate-500 mt-2">Roles filtered for Hearing-Not-Required and ASL-First environments.</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => user && generateVURIMatches(user)}>
                   <i className={`fas fa-sync ${isLoading ? 'animate-spin' : ''}`}></i> Refresh Engine
                </Button>
             </div>

             {isLoading ? (
               <div className="py-32 text-center">
                  <div className="w-16 h-16 border-4 border-[#01AEF0] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-[#003366] font-black uppercase tracking-widest text-xs">VURI is evaluating job landscapes...</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {matches.map(match => (
                    <div key={match.id} className="bg-white border rounded-3xl p-8 hover:shadow-2xl transition-all group flex flex-col">
                       <div className="flex justify-between items-center mb-6">
                          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                             <i className="fas fa-briefcase"></i>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-[#01AEF0] uppercase">VURI Score</p>
                             <p className="text-lg font-black text-[#003366]">{match.matchScore}%</p>
                          </div>
                       </div>
                       
                       <h3 className="text-xl font-black text-[#003366] mb-1">{match.title}</h3>
                       <p className="text-sm font-bold text-slate-400 mb-6">{match.company} • {match.location}</p>

                       <div className="bg-[#01AEF0]/5 border-l-4 border-[#01AEF0] p-4 rounded-r-xl mb-6">
                          <p className="text-[10px] font-black text-[#01AEF0] uppercase mb-1">Deaf Context Insight</p>
                          <p className="text-xs text-slate-600 leading-relaxed italic">"{match.vuriInsight}"</p>
                       </div>

                       <div className="flex flex-wrap gap-2 mb-8 flex-1">
                          {match.accessibilityFeatures.map(feat => (
                            <span key={feat} className="px-2 py-0.5 bg-slate-100 text-[9px] font-bold text-slate-500 rounded uppercase tracking-tighter">{feat}</span>
                          ))}
                       </div>

                       <div className="flex gap-3">
                          <Button variant="navy" className="flex-1">Apply Now</Button>
                          <div className="flex border rounded-lg overflow-hidden">
                             <button 
                                onClick={() => handleFeedback(match.id, 'positive')}
                                className={`px-3 transition-colors ${match.feedback === 'positive' ? 'bg-green-500 text-white' : 'hover:bg-green-50 text-slate-300'}`}
                             >
                                <i className="fas fa-thumbs-up text-xs"></i>
                             </button>
                             <button 
                                onClick={() => handleFeedback(match.id, 'negative')}
                                className={`px-3 border-l transition-colors ${match.feedback === 'negative' ? 'bg-red-500 text-white' : 'hover:bg-red-50 text-slate-300'}`}
                             >
                                <i className="fas fa-thumbs-down text-xs"></i>
                             </button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
             )}
          </main>
        )}

        {/* Existing structural pages kept for navigational integrity */}
        {['/career', '/learning', '/community', '/support', '/about', '/contact', '/vault', '/success-stories', '/blog'].map(p => path === p && (
           <main key={p} className="max-w-7xl mx-auto p-8 animate-in py-32 text-center">
              <h1 className="text-4xl font-black text-[#003366] uppercase mb-4">{p.replace('/', '').replace('-', ' ')}</h1>
              <p className="text-slate-400">Section Content Synchronizing...</p>
              <Button variant="outline" className="mt-8 mx-auto" onClick={() => setPath('/dashboard')}>Return to Dashboard</Button>
           </main>
        ))}
      </div>

      <footer className="bg-[#003366] text-white py-16 px-8">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
               <div className="flex flex-col mb-6 cursor-pointer" onClick={() => setPath('/')}>
                  <span className="text-3xl font-black tracking-tighter">VR4DEAF</span>
                  <span className="text-[10px] font-bold text-[#01AEF0] uppercase tracking-widest">Vocational Access Network</span>
               </div>
               <p className="text-xs text-white/50 leading-relaxed italic">"Deaf-First Pathways to Careers & Community."</p>
            </div>
            <div>
               <h4 className="text-[11px] font-black uppercase tracking-widest mb-6 text-[#FFB800]">VURI Ecosystem</h4>
               <ul className="space-y-3 text-xs text-white/60 font-medium">
                  <li><button onClick={() => setPath('/matches')} className="hover:text-[#01AEF0]">Smart Matching</button></li>
                  <li><button onClick={() => setPath('/career')} className="hover:text-[#01AEF0]">HNR Careers</button></li>
                  <li><button onClick={() => setPath('/vault')} className="hover:text-[#01AEF0]">Secure VR Vault</button></li>
               </ul>
            </div>
            <div>
               <h4 className="text-[11px] font-black uppercase tracking-widest mb-6 text-[#FFB800]">Support</h4>
               <ul className="space-y-3 text-xs text-white/60 font-medium">
                  <li><button onClick={() => setPath('/support')} className="hover:text-[#01AEF0]">Help Center</button></li>
                  <li><button onClick={() => setPath('/contact')} className="hover:text-[#01AEF0]">Accessibility Support</button></li>
               </ul>
            </div>
            <div className="flex flex-col items-center md:items-end">
               <div className="flex gap-4 text-xl text-white/30 mb-8">
                  <i className="fab fa-facebook hover:text-white cursor-pointer"></i>
                  <i className="fab fa-twitter hover:text-white cursor-pointer"></i>
                  <i className="fab fa-instagram hover:text-white cursor-pointer"></i>
                  <i className="fas fa-lock hover:text-white cursor-pointer"></i>
               </div>
               <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">© 2024 VR4DEAF.ORG</p>
            </div>
         </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

{
  "requestFramePermissions": [
    "camera",
    "microphone",
    "bluetooth"
  ],
  "name": "VR4DEAF.org | Deaf-First Workforce Ecosystem",
  "description": "The premier vocational rehabilitation hub for Deaf-First programs, career pathways, learning resources, and community networking."
}
