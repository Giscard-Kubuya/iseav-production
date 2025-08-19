import TeacherSidebar from '@/src/components/teacher/TeacherSidebar'
import TeacherHeader from '@/src/components/teacher/TeacherHeader'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherHeader />
      <div className="flex">
        <TeacherSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}