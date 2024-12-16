export default function Message({content}: {content: string}) {
    return (
        <p className="bg-slate-700 px-5 py-3 mt-5 rounded-full text-white">{content}</p>
    )
}