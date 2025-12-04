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