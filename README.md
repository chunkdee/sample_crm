# OctoCRM Frontend Application

A modern Customer Relationship Management (CRM) system built with React, Ant Design, and Supabase.

## 🚀 Features

- **Authentication & Authorization**
  - User registration and login
  - Role-based access control
  - Profile management

- **Contact Management**
  - Contact creation and management
  - Contact details view
  - Contact history tracking

- **Company Management**
  - Company profiles
  - Company hierarchy
  - Business relationship tracking

- **Deal Management**
  - Opportunity tracking
  - Deal pipeline
  - Sales forecasting

- **Quote Management**
  - Quote creation
  - Quote editing
  - Quote tracking

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **UI Components**: Ant Design
- **Admin Framework**: React-Admin
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **API**: Supabase REST API
- **State Management**: React Context
- **Routing**: React Router
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crm_frontend_application_v3.git
cd crm_frontend_application_v3
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Start the development server:
```bash
npm run dev
```

## 🗄️ Database Setup

1. Start the Supabase services:
```bash
docker-compose up -d
```

2. Run the database migrations:
```bash
npm run db:migrate
```

3. Seed the database (optional):
```bash
npm run db:seed
```

## 🔑 Authentication

The application uses Supabase Authentication with the following features:
- Email/Password authentication
- Role-based access control
- JWT token management
- Session management

## 👥 User Roles

- **Admin**: Full system access
- **Sales**: Access to contacts, companies, opportunities, and quotes
- **Support**: Access to contacts and support tickets
- **Manager**: Access to reports and team management

## 🔐 Permissions

Permissions are managed through a JSONB field in the profiles table:
```json
{
  "subject": "opportunities",
  "actions": ["create", "read", "update"],
  "conditions": {
    "companyId": "auth.user.company_id"
  }
}
```

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📞 Support

For support, email support@octocrm.com or join our Slack channel.

## 🔄 Development Workflow

1. Start the development server:
```bash
npm run dev
```

2. Run tests:
```bash
npm test
```

3. Build for production:
```bash
npm run build
```

## 📚 Documentation

Additional documentation can be found in the `docs` directory:
- [API Documentation](docs/api.md)
- [Database Schema](docs/schema.md)
- [Authentication Flow](docs/auth.md)
- [Development Guide](docs/development.md)