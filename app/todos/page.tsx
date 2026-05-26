import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Todo List (Supabase Test)</h1>
      <ul className="space-y-2">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 shadow-sm text-slate-700 dark:text-slate-300">
              {todo.name}
            </li>
          ))
        ) : (
          <p className="text-slate-500">할 일이 없거나 Supabase todos 테이블에서 데이터를 불러오지 못했습니다.</p>
        )}
      </ul>
    </main>
  )
}
