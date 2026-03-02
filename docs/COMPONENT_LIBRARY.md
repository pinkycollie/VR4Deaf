# Magician Component Library

## Overview

The Magician Component Library is a collection of reusable, accessible, and themeable UI components designed specifically for the VR4DEAF platform. Built on top of Radix UI and styled with TailwindCSS, these components follow the DEAF-FIRST design philosophy.

## Installation

Components are available in the main VR4Deaf repository under `components/magician/`.

```bash
# Import components in your application
import { MagicianCard } from '@/components/magician/MagicianCard';
import { MagicianForm } from '@/components/magician/MagicianForm';
```

## Design Principles

1. **Accessibility First** - WCAG 2.1 AA compliant
2. **Visual Clarity** - High contrast, clear visual hierarchy
3. **Keyboard Navigation** - Full keyboard support
4. **Screen Reader Support** - Proper ARIA labels and semantic HTML
5. **Responsive Design** - Mobile-first approach
6. **Consistent Branding** - 360 Business Magician theme

## Components

### MagicianCard

A versatile card component for displaying content in a structured format.

#### Usage

```tsx
import { MagicianCard } from '@/components/magician/MagicianCard';
import { Briefcase } from 'lucide-react';

<MagicianCard
  title="Job Opportunity"
  description="Administrative Assistant position available"
  icon={<Briefcase className="h-6 w-6" />}
  variant="highlighted"
  actions={
    <Button>View Details</Button>
  }
>
  <div className="space-y-2">
    <p>Company: ABC Corporation</p>
    <p>Location: Austin, TX</p>
    <p>Salary: $40,000 - $50,000</p>
  </div>
</MagicianCard>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Card title |
| `description` | `string` | - | Optional description |
| `icon` | `ReactNode` | - | Optional icon |
| `actions` | `ReactNode` | - | Action buttons or links |
| `variant` | `'default' \| 'highlighted' \| 'bordered'` | `'default'` | Visual variant |
| `accessibilityLabel` | `string` | - | Custom ARIA label |
| `children` | `ReactNode` | - | Card content |

#### Variants

```tsx
// Default variant
<MagicianCard title="Default Card" />

// Highlighted variant (for important information)
<MagicianCard title="Important" variant="highlighted" />

// Bordered variant (for visual separation)
<MagicianCard title="Info" variant="bordered" />
```

### MagicianForm

Form component with built-in validation and accessibility features.

#### Usage

```tsx
import { MagicianForm } from '@/components/magician/MagicianForm';
import { z } from 'zod';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
});

<MagicianForm
  schema={profileSchema}
  onSubmit={(data) => {
    console.log('Form submitted:', data);
  }}
  submitLabel="Update Profile"
>
  <MagicianForm.Input
    name="firstName"
    label="First Name"
    placeholder="John"
    required
  />
  <MagicianForm.Input
    name="lastName"
    label="Last Name"
    placeholder="Doe"
    required
  />
  <MagicianForm.Input
    name="email"
    label="Email"
    type="email"
    placeholder="john@example.com"
    required
  />
  <MagicianForm.Input
    name="phone"
    label="Phone Number"
    type="tel"
    placeholder="+1 (555) 123-4567"
  />
</MagicianForm>
```

#### Form Field Components

**Input**
```tsx
<MagicianForm.Input
  name="fieldName"
  label="Field Label"
  type="text"
  placeholder="Enter value"
  required
  disabled={false}
  helperText="Additional information"
/>
```

**Select**
```tsx
<MagicianForm.Select
  name="category"
  label="Category"
  options={[
    { value: 'tech', label: 'Technology' },
    { value: 'admin', label: 'Administrative' },
  ]}
  required
/>
```

**Textarea**
```tsx
<MagicianForm.Textarea
  name="description"
  label="Description"
  placeholder="Enter description"
  rows={4}
/>
```

**Checkbox**
```tsx
<MagicianForm.Checkbox
  name="agree"
  label="I agree to the terms and conditions"
/>
```

**Radio Group**
```tsx
<MagicianForm.RadioGroup
  name="preference"
  label="Preferred Contact Method"
  options={[
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'sms', label: 'SMS' },
  ]}
/>
```

### MagicianTable

Data table component with sorting, filtering, and pagination.

#### Usage

```tsx
import { MagicianTable } from '@/components/magician/MagicianTable';

const columns = [
  {
    key: 'title',
    header: 'Job Title',
    sortable: true,
  },
  {
    key: 'company',
    header: 'Company',
    sortable: true,
  },
  {
    key: 'location',
    header: 'Location',
  },
  {
    key: 'salary',
    header: 'Salary',
    sortable: true,
    format: (value) => `$${value.toLocaleString()}`,
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (row) => (
      <Button size="sm" onClick={() => handleView(row.id)}>
        View
      </Button>
    ),
  },
];

const data = [
  { id: 1, title: 'Admin Assistant', company: 'ABC Corp', location: 'Austin, TX', salary: 45000 },
  { id: 2, title: 'IT Support', company: 'XYZ Inc', location: 'Dallas, TX', salary: 50000 },
];

<MagicianTable
  columns={columns}
  data={data}
  sortable
  filterable
  pagination={{
    pageSize: 10,
    currentPage: 1,
    totalItems: 50,
    onPageChange: handlePageChange,
  }}
  onSort={handleSort}
  emptyMessage="No jobs found"
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `Column[]` | Column definitions |
| `data` | `any[]` | Table data |
| `sortable` | `boolean` | Enable sorting |
| `filterable` | `boolean` | Enable filtering |
| `pagination` | `PaginationConfig` | Pagination settings |
| `onSort` | `(column: string, direction: 'asc' \| 'desc') => void` | Sort handler |
| `emptyMessage` | `string` | Message when no data |

### MagicianModal

Modal dialog component for important actions and information.

#### Usage

```tsx
import { MagicianModal } from '@/components/magician/MagicianModal';
import { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <MagicianModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        size="medium"
      >
        <div className="space-y-4">
          <p>This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </MagicianModal>
    </>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | Required | Modal visibility |
| `onClose` | `() => void` | Required | Close handler |
| `title` | `string` | Required | Modal title |
| `description` | `string` | - | Optional description |
| `size` | `'small' \| 'medium' \| 'large' \| 'full'` | `'medium'` | Modal size |
| `closeOnOverlayClick` | `boolean` | `true` | Close on outside click |
| `children` | `ReactNode` | - | Modal content |

### MagicianNotification

Notification and toast component for user feedback.

#### Usage

```tsx
import { MagicianNotification, useNotification } from '@/components/magician/MagicianNotification';

function Example() {
  const { notify } = useNotification();

  const handleSuccess = () => {
    notify({
      type: 'success',
      title: 'Success!',
      message: 'Your profile has been updated.',
      duration: 5000,
    });
  };

  const handleError = () => {
    notify({
      type: 'error',
      title: 'Error',
      message: 'Failed to save changes. Please try again.',
      duration: 0, // Persistent until dismissed
    });
  };

  return (
    <div>
      <Button onClick={handleSuccess}>Show Success</Button>
      <Button onClick={handleError}>Show Error</Button>
      <MagicianNotification />
    </div>
  );
}
```

#### Notification Types

```tsx
// Success notification
notify({
  type: 'success',
  title: 'Success',
  message: 'Operation completed successfully',
});

// Error notification
notify({
  type: 'error',
  title: 'Error',
  message: 'Something went wrong',
});

// Warning notification
notify({
  type: 'warning',
  title: 'Warning',
  message: 'Please review your information',
});

// Info notification
notify({
  type: 'info',
  title: 'Information',
  message: 'Here is some helpful information',
});
```

### MagicianChart

Data visualization component for analytics and reporting.

#### Usage

```tsx
import { MagicianChart } from '@/components/magician/MagicianChart';

const data = [
  { month: 'Jan', applications: 12, interviews: 4, placements: 2 },
  { month: 'Feb', applications: 18, interviews: 6, placements: 3 },
  { month: 'Mar', applications: 15, interviews: 7, placements: 4 },
];

// Line Chart
<MagicianChart
  type="line"
  data={data}
  xKey="month"
  lines={[
    { dataKey: 'applications', color: '#3b82f6', label: 'Applications' },
    { dataKey: 'interviews', color: '#10b981', label: 'Interviews' },
    { dataKey: 'placements', color: '#8b5cf6', label: 'Placements' },
  ]}
  title="Job Search Progress"
  height={300}
/>

// Bar Chart
<MagicianChart
  type="bar"
  data={data}
  xKey="month"
  bars={[
    { dataKey: 'applications', color: '#3b82f6', label: 'Applications' },
  ]}
  title="Monthly Applications"
  height={300}
/>

// Pie Chart
<MagicianChart
  type="pie"
  data={[
    { name: 'Technical', value: 45 },
    { name: 'Administrative', value: 30 },
    { name: 'Customer Service', value: 25 },
  ]}
  title="Skills Distribution"
  height={300}
/>
```

### MagicianLayout

Layout components for consistent page structure.

#### Usage

```tsx
import { 
  MagicianLayout,
  MagicianSidebar,
  MagicianHeader,
  MagicianFooter,
} from '@/components/magician/MagicianLayout';

<MagicianLayout>
  <MagicianHeader
    title="Client Dashboard"
    subtitle="Welcome back, John!"
    actions={<Button>Settings</Button>}
  />
  
  <div className="flex">
    <MagicianSidebar
      items={[
        { icon: <Home />, label: 'Dashboard', href: '/client' },
        { icon: <User />, label: 'Profile', href: '/client/profile' },
        { icon: <Briefcase />, label: 'Jobs', href: '/client/jobs' },
      ]}
    />
    
    <main className="flex-1 p-6">
      {/* Page content */}
    </main>
  </div>
  
  <MagicianFooter />
</MagicianLayout>
```

## Accessibility Features

### Keyboard Navigation

All components support full keyboard navigation:

- **Tab** - Navigate between interactive elements
- **Enter/Space** - Activate buttons and links
- **Arrow Keys** - Navigate within components (dropdowns, radios, etc.)
- **Escape** - Close modals and dropdowns

### Screen Reader Support

Components include proper ARIA attributes:

```tsx
<MagicianCard
  title="Job Application"
  accessibilityLabel="Job application status card showing interview scheduled"
  role="article"
  aria-describedby="job-description"
>
  <p id="job-description">
    Your interview has been scheduled for tomorrow at 2 PM
  </p>
</MagicianCard>
```

### Visual Accessibility

- **High Contrast Mode** - Components adapt to system high contrast settings
- **Focus Indicators** - Clear focus outlines for keyboard navigation
- **Color Contrast** - WCAG AA compliant color ratios
- **Text Sizing** - Supports user font size preferences

## Theming

### Using Theme Provider

```tsx
import { MagicianThemeProvider } from '@/components/magician/theme';

<MagicianThemeProvider
  defaultTheme="light"
  storageKey="vr4deaf-theme"
>
  <App />
</MagicianThemeProvider>
```

### Custom Theme

```tsx
const customTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
};

<MagicianThemeProvider theme={customTheme}>
  <App />
</MagicianThemeProvider>
```

## Best Practices

### Component Composition

Build complex UIs by composing smaller components:

```tsx
<MagicianCard
  title="Job Application Tracker"
  actions={<Button>View All</Button>}
>
  <MagicianTable
    columns={columns}
    data={applications}
    pagination={{ pageSize: 5 }}
  />
</MagicianCard>
```

### Accessibility

Always provide meaningful labels and descriptions:

```tsx
// Good
<MagicianForm.Input
  name="email"
  label="Email Address"
  placeholder="john@example.com"
  aria-describedby="email-hint"
/>
<p id="email-hint" className="text-sm text-muted">
  We'll never share your email with anyone else.
</p>

// Bad
<input name="email" placeholder="Email" />
```

### Performance

Use code splitting for large components:

```tsx
import dynamic from 'next/dynamic';

const MagicianChart = dynamic(
  () => import('@/components/magician/MagicianChart'),
  { ssr: false, loading: () => <LoadingSpinner /> }
);
```

### Error Handling

Provide clear error messages:

```tsx
<MagicianForm.Input
  name="salary"
  label="Desired Salary"
  type="number"
  error={errors.salary?.message}
  helperText="Enter your desired annual salary"
/>
```

## Migration Guide

### From Basic Components

```tsx
// Before
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// After
<MagicianCard title="Title">
  Content
</MagicianCard>
```

### From Custom Forms

```tsx
// Before
<form onSubmit={handleSubmit}>
  <input name="name" />
  <button type="submit">Submit</button>
</form>

// After
<MagicianForm
  schema={schema}
  onSubmit={handleSubmit}
  submitLabel="Submit"
>
  <MagicianForm.Input name="name" label="Name" />
</MagicianForm>
```

## Component Status

| Component | Status | Version |
|-----------|--------|---------|
| MagicianCard | ✅ Stable | 1.0.0 |
| MagicianForm | ✅ Stable | 1.0.0 |
| MagicianTable | 🚧 Beta | 0.9.0 |
| MagicianModal | ✅ Stable | 1.0.0 |
| MagicianNotification | ✅ Stable | 1.0.0 |
| MagicianChart | 🚧 Beta | 0.8.0 |
| MagicianLayout | 🚧 Beta | 0.9.0 |

## Contributing

To contribute new components:

1. Follow the existing component structure
2. Include comprehensive TypeScript types
3. Add accessibility features (ARIA labels, keyboard support)
4. Write unit tests
5. Document props and usage examples
6. Add to component status table

## Support

For component library support:
- **Documentation:** https://components.vr4deaf.org
- **GitHub Issues:** https://github.com/pinkycollie/VR4Deaf/issues
- **Discord:** https://discord.gg/vr4deaf

---

**Last Updated:** December 2024
