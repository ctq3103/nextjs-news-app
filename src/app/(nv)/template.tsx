export default function NVTemplate({children}: {children: React.ReactNode}) {
    return (
        <div className="animate-appear">
            {children}
        </div>
    )
}