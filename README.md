# Dan's Car Lot Manager

Complete management system for car dealerships with time tracking, inventory, maintenance, customer management, and financial reporting.

## Features

- ⏰ Time Tracking
- ✅ Task Management
- 🚗 Vehicle Inventory
- 🔧 Maintenance Records
- 📞 Follow-up Reminders
- 💰 Financial Reports
- 👥 Customer Database
- 📈 Sales Tracking
- 🔄 DMS Integration

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Deployment

### Cloudflare Pages

1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Configure build settings:
   - **Build command:** \`npm run build\`
   - **Build output directory:** \`dist\`
   - **Root directory:** \`/\`
   - **Node version:** \`18\` or higher

4. Deploy!

## Environment Variables

Copy \`.env.example\` to \`.env.local\` and configure:

\`\`\`
VITE_DMS_API_ENDPOINT=your_dms_endpoint
\`\`\`

## License

MIT License - for personal and commercial use

## Support

For issues or questions, please open a GitHub issue.
