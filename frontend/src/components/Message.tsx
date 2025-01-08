export default function Message({user, content}: {user: string, content: string}) {
    return (
        <div className="mt-3">
            <p className="ml-3 text-black dark:text-white">{user}</p>
            <p className="bg-gray-100 dark:bg-slate-700 px-5 py-3 rounded-full dark:text-white">{content}</p>
        </div>
    )
}