# LMS Course Platform

![LMS Platform Banner](https://via.placeholder.com/1200x400?text=LMS+Course+Platform)

A comprehensive, full-stack Learning Management System (LMS) built from scratch. This platform includes a stunning landing page for showcasing courses, an intuitive admin dashboard for course management and analytics, and a feature-rich customer dashboard for tracking progress, watching videos, and more. Inspired by a detailed YouTube tutorial series, this project covers everything from authentication to deployment.

## 📚 Project Overview

This LMS allows administrators to create, edit, and manage courses with drag-and-drop functionality, rich text editing, file uploads, and analytics. Customers can browse courses, make payments via Stripe, track lesson progress, watch videos in a custom player, and mark completions. The application is secure, responsive, and optimized for performance.

Built as a full-stack application using modern technologies, it's ideal for educators, online course creators, or anyone looking to host video-based learning content.

## ✨ Features

- **🌐 Beautiful Landing Page**: Display all available courses with customizable designs.
- **🧑‍💼 Admin Dashboard**: Create/edit courses, track success with analytics, manage uploads, and more.
- **👤 Customer Dashboard**: Track video progress, watch individual lessons, read descriptions, mark completions.
- **🔒 Secure Authentication**: Email OTP and GitHub OAuth via Better-Auth.
- **🛡️ Advanced Security**: Protection against XSS, SQL injection, and other attacks using Arcjet.
- **🚫 Rate Limiting**: Prevent abuse with built-in controls.
- **🎥 Custom Video Player**: Seamless video watching experience.
- **📊 Analytics**: Beautiful charts and insights for course performance.
- **📁 File Uploads**: S3 integration with presigned URLs for secure uploads.
- **✅ Progress & Completion Tracking**: Lesson-level tracking for users.
- **⭐ Custom Dropzone**: Drag-and-drop file uploads.
- **💳 Stripe Integration**: Handle payments for course purchases.
- **🖱️ Drag & Drop Course Structure**: Easily organize lessons and modules.
- **📝 Custom Rich Text Editor**: For creating rich course descriptions.
- **🧮 Database & ORM**: Neon Postgres with Prisma for efficient data management.
- **🚀 Deployment**: Hosted on Vercel for fast, scalable performance.

**Additional Highlights**:
- Fully responsive design across devices.
- Performance-optimized architecture.
- Clean, maintainable codebase with Data Access Layer (DAL).

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) & [Shadcn UI](https://ui.shadcn.com)
- **Authentication**: [Better-Auth](https://www.better-auth.com/) (Email OTP & GitHub OAuth)
- **Security**: [Arcjet](https://launch.arcjet.com/BSFyrhW)
- **Database**: [Neon Postgres](https://neon.tech/)
- **ORM**: [Prisma](https://prisma.io)
- **Storage**: [Tigris](https://www.tigrisdata.com/) (for S3-compatible uploads)
- **Validation**: [Zod](https://zod.dev/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Other**: Custom components for video player, rich text editor, and drag-and-drop.

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended package manager)
- Accounts for: Neon DB, Stripe, AWS S3 (or compatible), GitHub (for OAuth), Arcjet.

## 🚀 Installation

1. **Clone the Repository**:
   ```
   git clone https://github.com/your-username/lms-course-platform.git
   cd lms-course-platform
   ```

2. **Install Dependencies**:
   ```
   pnpm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following (replace with your credentials):
   ```
   DATABASE_URL=your-neon-postgres-url
   NEXTAUTH_SECRET=your-secret-key
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   STRIPE_SECRET_KEY=your-stripe-secret
   S3_ACCESS_KEY=your-s3-access-key
   S3_SECRET_KEY=your-s3-secret-key
   ARCJET_KEY=your-arcjet-key
   # Add more as needed
   ```

4. **Install Shadcn UI Components**:
   Run the following command to add required UI components:
   ```
   pnpm dlx shadcn@latest add alert-dialog avatar badge breadcrumb button card chart checkbox collapsible dialog drawer dropdown-menu form input-otp input label progress select separator sheet sidebar skeleton sonner table tabs textarea toggle-group toggle tooltip
   ```

5. **Set Up Prisma**:
   ```
   pnpm prisma generate
   pnpm prisma db push
   ```

6. **Run the Development Server**:
   ```
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧑‍🏫 Usage

- **Admin Access**: Log in as an admin to access the dashboard for creating/editing courses.
- **Customer Experience**: Sign up/log in to browse courses, purchase, and track progress.
- **Course Creation**: Use the admin panel to upload videos, add descriptions, and structure lessons with drag-and-drop.
- **Payments**: Integrate Stripe for seamless course purchases.
- **Analytics**: View engagement metrics in the admin dashboard.

## 📦 Deployment

Deploy to Vercel for production:

1. Push your code to GitHub.
2. Connect your repo to Vercel.
3. Add environment variables in Vercel dashboard.
4. Deploy and monitor.

For more details, refer to the [Vercel documentation](https://vercel.com/docs).

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a branch, and submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Inspired by an in-depth YouTube tutorial series.
- Thanks to the open-source communities behind Next.js, Tailwind, Shadcn, and more.

If you have questions, open an issue or reach out! 🚀
