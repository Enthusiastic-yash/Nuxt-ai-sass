import type { NavigationMenuItem } from '@nuxt/ui'
export const sideBarRoutes : NavigationMenuItem[][] = [[
    {
  label: 'Conversation',
  icon: 'i-lucide-message-square-text',
  to : '/dashboard/conversation'
}, {
  label: 'Code Generation',
  icon: 'i-lucide-code',
  to : '/dashboard/code'
}, {
  label: 'AI Article Writer',
  icon: 'i-lucide-square-pen',
   to : '/dashboard/article-writer'
},
 {
  label: 'Blog Title Generator',
  icon: 'i-lucide-hash',
   to : '/dashboard/generate-blog-title'
},
 {
  label: 'Background Removal',
  icon: 'i-lucide-eraser',
   to : '/dashboard/remove-background'
},
 {
  label: 'Object Removal',
  icon: 'i-lucide-scissors',
   to : '/dashboard/remove-object'
},
 {
  label: 'Resume Reviewer',
  icon: 'i-lucide-notepad-text',
   to : '/dashboard/review-resume'

},
]]

export const aiTools = [
  {
    title: 'Conversation',
    description: 'Engage in natural, intelligent conversations with AI for brainstorming, questions, or casual chat.',
    icon: 'i-lucide-message-square-text',
    path: '/dashboard/conversation',
    btnText: 'Start conversation'
  },
  {
    title: 'Code Generation',
    description: 'Generate clean, efficient code snippets and solutions across multiple programming languages.',
    icon: 'i-lucide-code',
    path: '/dashboard/code',
    btnText: 'Generate code'
  },
  {
    title: 'AI Article Writer',
    description: 'Create high-quality articles with AI assistance, tailored to your topic and audience.',
    icon: 'i-lucide-square-pen',
    path: '/dashboard/article-writer',
    btnText: 'Write article'
  },
  {
    title: 'Blog Title Generator',
    description: 'Generate catchy and SEO-friendly blog titles to boost engagement.',
    icon: 'i-lucide-hash',
    path: '/dashboard/generate-blog-title',
    btnText: 'Generate titles'
  },
  {
    title: 'Background Removal',
    description: 'Remove image backgrounds instantly with AI-powered precision.',
    icon: 'i-lucide-eraser',
    path: '/dashboard/remove-background',
    btnText: 'Remove background'
  },
  {
    title: 'Object Removal',
    description: 'Erase unwanted objects from images seamlessly using AI.',
    icon: 'i-lucide-scissors',
    path: '/dashboard/remove-object',
    btnText: 'Remove object'
  },
  {
    title: 'Resume Reviewer',
    description: 'Get AI-powered feedback and suggestions to improve your resume.',
    icon: 'i-lucide-notepad-text',
    path: '/dashboard/review-resume',
    btnText: 'Review resume'
  }
]
