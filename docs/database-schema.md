# Database Schema - VR4Deaf Platform

Complete Supabase database schema with row-level security policies for multi-tenant vocational rehabilitation platform.

## Overview

This schema supports:
- Multi-agency management (VR, LGBTQ+, Deaf, Multi-service)
- Role-based access control (Admin, Supervisor, Counselor, Client)
- Case management with comprehensive tracking
- Service delivery and documentation
- RSA-911 compliance reporting
- Accessibility-first design

## Tables

### agencies

Core agency information for multi-tenant support.

```sql
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('VR', 'LGBTQ+', 'Deaf', 'Multi-service')),
  code TEXT UNIQUE NOT NULL,
  location TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agencies_type ON agencies(type);
CREATE INDEX idx_agencies_code ON agencies(code);
```

### users

User accounts with role-based access.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  auth_user_id UUID UNIQUE, -- Links to Supabase Auth
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'supervisor', 'counselor', 'client')),
  phone TEXT,
  accessibility_needs TEXT[],
  preferences JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_agency ON users(agency_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
```

### clients

Extended client profile information.

```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  date_of_birth DATE NOT NULL,
  ssn_last4 TEXT, -- Last 4 digits only for privacy
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  disability_types TEXT[],
  veteran_status BOOLEAN DEFAULT false,
  education_level TEXT,
  employment_status TEXT CHECK (employment_status IN ('unemployed', 'underemployed', 'employed', 'student')),
  income_level TEXT,
  emergency_contact JSONB,
  accessibility_needs TEXT[],
  communication_preferences JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_agency ON clients(agency_id);
CREATE INDEX idx_clients_user ON clients(user_id);
```

### cases

Case management core table.

```sql
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_number TEXT UNIQUE NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  assigned_counselor_id UUID REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'intake' CHECK (status IN ('intake', 'assessment', 'planning', 'services', 'placement', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  eligibility_programs TEXT[],
  service_start_date DATE,
  service_end_date DATE,
  closure_reason TEXT,
  outcome TEXT CHECK (outcome IN ('employed', 'education', 'self-employed', 'unsuccessful', 'other')),
  outcome_details JSONB,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cases_client ON cases(client_id);
CREATE INDEX idx_cases_agency ON cases(agency_id);
CREATE INDEX idx_cases_counselor ON cases(assigned_counselor_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_case_number ON cases(case_number);
```

### services

Service delivery tracking.

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  service_category TEXT,
  provider_name TEXT,
  provider_id UUID REFERENCES users(id),
  service_date DATE NOT NULL,
  hours DECIMAL(5,2),
  cost DECIMAL(10,2),
  location TEXT,
  delivery_method TEXT CHECK (delivery_method IN ('in-person', 'virtual', 'hybrid')),
  notes TEXT,
  accessibility_accommodations TEXT[],
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_case ON services(case_id);
CREATE INDEX idx_services_type ON services(service_type);
CREATE INDEX idx_services_date ON services(service_date);
```

### documents

Document management with secure storage links.

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id),
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  storage_path TEXT NOT NULL, -- Supabase Storage path
  description TEXT,
  tags TEXT[],
  accessible_format BOOLEAN DEFAULT false,
  expiration_date DATE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_case ON documents(case_id);
CREATE INDEX idx_documents_client ON documents(client_id);
CREATE INDEX idx_documents_type ON documents(document_type);
```

### assessments

Skills and eligibility assessments.

```sql
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL,
  assessed_by UUID REFERENCES users(id),
  assessment_date DATE NOT NULL,
  results JSONB NOT NULL,
  skills JSONB,
  recommendations TEXT[],
  accessibility_needs TEXT[],
  interpreter_needed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_assessments_case ON assessments(case_id);
CREATE INDEX idx_assessments_type ON assessments(assessment_type);
```

### job_placements

Employment placement tracking.

```sql
CREATE TABLE job_placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  employer_name TEXT NOT NULL,
  employer_contact JSONB,
  job_title TEXT NOT NULL,
  job_description TEXT,
  placement_date DATE NOT NULL,
  start_date DATE,
  hourly_wage DECIMAL(10,2),
  hours_per_week DECIMAL(5,2),
  benefits TEXT[],
  accessibility_accommodations TEXT[],
  deaf_friendly BOOLEAN DEFAULT false,
  lgbtq_inclusive BOOLEAN DEFAULT false,
  placement_status TEXT DEFAULT 'active' CHECK (placement_status IN ('active', 'ended', 'retained')),
  retention_check_dates DATE[],
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_placements_case ON job_placements(case_id);
CREATE INDEX idx_placements_status ON job_placements(placement_status);
```

### costs

Cost tracking for RSA-911 reporting.

```sql
CREATE TABLE costs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id),
  category TEXT NOT NULL,
  subcategory TEXT,
  amount DECIMAL(10,2) NOT NULL,
  vendor TEXT,
  invoice_number TEXT,
  payment_date DATE,
  fiscal_year INTEGER,
  quarter INTEGER CHECK (quarter BETWEEN 1 AND 4),
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_costs_case ON costs(case_id);
CREATE INDEX idx_costs_category ON costs(category);
CREATE INDEX idx_costs_fiscal_year ON costs(fiscal_year);
```

### activity_log

Audit trail for all system activities.

```sql
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  agency_id UUID REFERENCES agencies(id),
  action_type TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_user ON activity_log(user_id);
CREATE INDEX idx_activity_agency ON activity_log(agency_id);
CREATE INDEX idx_activity_type ON activity_log(action_type);
CREATE INDEX idx_activity_created ON activity_log(created_at);
```

## Row Level Security (RLS) Policies

### agencies table

```sql
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;

-- Users can view their own agency
CREATE POLICY "Users can view own agency"
  ON agencies FOR SELECT
  USING (
    id IN (
      SELECT agency_id FROM users 
      WHERE auth_user_id = auth.uid()
    )
  );

-- Admins can update their agency
CREATE POLICY "Admins can update own agency"
  ON agencies FOR UPDATE
  USING (
    id IN (
      SELECT agency_id FROM users 
      WHERE auth_user_id = auth.uid() AND role = 'admin'
    )
  );
```

### users table

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can view users in their agency
CREATE POLICY "Users can view agency users"
  ON users FOR SELECT
  USING (
    agency_id IN (
      SELECT agency_id FROM users 
      WHERE auth_user_id = auth.uid()
    )
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth_user_id = auth.uid());

-- Admins and supervisors can manage users
CREATE POLICY "Admins/supervisors can manage users"
  ON users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_user_id = auth.uid() 
      AND role IN ('admin', 'supervisor')
      AND agency_id = users.agency_id
    )
  );
```

### cases table

```sql
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Users can view cases in their agency
CREATE POLICY "Users can view agency cases"
  ON cases FOR SELECT
  USING (
    agency_id IN (
      SELECT agency_id FROM users 
      WHERE auth_user_id = auth.uid()
    )
  );

-- Counselors can manage assigned cases
CREATE POLICY "Counselors can manage assigned cases"
  ON cases FOR ALL
  USING (
    assigned_counselor_id IN (
      SELECT id FROM users 
      WHERE auth_user_id = auth.uid()
    )
  );

-- Clients can view their own cases
CREATE POLICY "Clients can view own cases"
  ON cases FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM clients 
      WHERE user_id IN (
        SELECT id FROM users WHERE auth_user_id = auth.uid()
      )
    )
  );
```

### documents table

```sql
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Users can view documents for cases in their agency
CREATE POLICY "Users can view agency documents"
  ON documents FOR SELECT
  USING (
    case_id IN (
      SELECT id FROM cases 
      WHERE agency_id IN (
        SELECT agency_id FROM users WHERE auth_user_id = auth.uid()
      )
    )
  );

-- Staff can upload documents
CREATE POLICY "Staff can upload documents"
  ON documents FOR INSERT
  WITH CHECK (
    uploaded_by IN (
      SELECT id FROM users 
      WHERE auth_user_id = auth.uid() 
      AND role IN ('admin', 'supervisor', 'counselor')
    )
  );
```

## Functions and Triggers

### Update timestamp trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_agencies_updated_at BEFORE UPDATE ON agencies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Activity logging trigger

```sql
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activity_log (
    user_id,
    action_type,
    resource_type,
    resource_id,
    description
  ) VALUES (
    (SELECT id FROM users WHERE auth_user_id = auth.uid()),
    TG_OP,
    TG_TABLE_NAME,
    NEW.id,
    'Automated activity log'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to critical tables
CREATE TRIGGER log_cases_activity AFTER INSERT OR UPDATE OR DELETE ON cases
  FOR EACH ROW EXECUTE FUNCTION log_activity();
```

## Sample Data

### Insert sample agency

```sql
INSERT INTO agencies (name, type, code, location) VALUES
  ('VR Services Inc.', 'VR', 'TX-VR-001', 'Houston, TX'),
  ('Pride Employment Center', 'LGBTQ+', 'TX-LGBTQ-001', 'Austin, TX'),
  ('Deaf Career Solutions', 'Deaf', 'TX-DEAF-001', 'Dallas, TX');
```

## RSA-911 Reporting Views

### Quarterly outcomes view

```sql
CREATE OR REPLACE VIEW rsa_911_quarterly_outcomes AS
SELECT
  a.name AS agency_name,
  a.code AS agency_code,
  EXTRACT(YEAR FROM c.service_end_date) AS fiscal_year,
  EXTRACT(QUARTER FROM c.service_end_date) AS quarter,
  COUNT(*) AS total_closures,
  COUNT(*) FILTER (WHERE outcome = 'employed') AS employed,
  COUNT(*) FILTER (WHERE outcome = 'education') AS education,
  COUNT(*) FILTER (WHERE outcome = 'self-employed') AS self_employed,
  AVG((outcome_details->>'hourly_wage')::DECIMAL) AS avg_wage,
  AVG((outcome_details->>'hours_per_week')::DECIMAL) AS avg_hours
FROM cases c
JOIN agencies a ON c.agency_id = a.id
WHERE c.status = 'closed'
  AND c.service_end_date IS NOT NULL
GROUP BY a.name, a.code, fiscal_year, quarter
ORDER BY fiscal_year DESC, quarter DESC;
```

## Maintenance and Optimization

### Regular maintenance tasks

```sql
-- Vacuum and analyze
VACUUM ANALYZE agencies;
VACUUM ANALYZE users;
VACUUM ANALYZE cases;
VACUUM ANALYZE services;

-- Reindex
REINDEX TABLE cases;
REINDEX TABLE services;
REINDEX TABLE documents;
```

## Backup and Recovery

Recommended backup schedule:
- Full backup: Daily at 2 AM
- Incremental backup: Every 6 hours
- Point-in-time recovery: 30 days retention
- Off-site replication: Enabled

## Security Notes

1. **Encryption**: All sensitive data encrypted at rest using Supabase encryption
2. **PII Protection**: Limited PII storage, use last 4 SSN only
3. **Access Control**: Strict RLS policies enforce multi-tenant isolation
4. **Audit Trail**: Complete activity logging for compliance
5. **Data Retention**: Configurable retention policies per agency
6. **HIPAA Compliance**: Enable BAA with Supabase for healthcare data

## Migration Guide

To apply this schema to your Supabase project:

```bash
# Using Supabase CLI
supabase db reset
supabase db push

# Or using SQL files
psql -h db.xxx.supabase.co -U postgres -d postgres -f schema.sql
```

## Support

For schema questions or issues:
- Review [Supabase Documentation](https://supabase.com/docs)
- Contact VR4Deaf support team
- Submit issues on GitHub repository
