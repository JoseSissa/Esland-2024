export function UserSessionControl({ signOut, imageSession, nameSession, textLogout }) {
    return (
        <div class={`flex items-center gap-2`}>
            <img
                src={imageSession}
                alt={nameSession}
                class="w-10 h-10 rounded-full"
            />
            <div>
                <span class="block">{nameSession}</span>
                <button onClick={() => signOut()}>{ textLogout }</button>
            </div>
        </div>
    )
}