export default function DecorativeLines() {
    return (
        <div className="hidden md:block">
            {["12%", "28%", "42%", "57%", "72%", "88%"].map((left) => (
                <div
                    key={left}
                    style={{ left }}
                    className="absolute z-10 top-0 -translate-x-1/2 -translate-y-1/4 flex flex-col"
                >
                    <div
                        className="w-px h-screen"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(187,187,187,0) 0%, rgba(187,187,187,0.12) 12%, rgba(187,187,187,0.12) 88%, rgba(187,187,187,0) 100%)",
                        }}
                    />
                </div>
            ))}
        </div>
    );
}