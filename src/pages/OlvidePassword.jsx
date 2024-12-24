
export const OlvidePassword = () => {
  return (
    <>
        <div className="bg-slate-900 min-h-screen flex items-center justify-center">
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <div>
                    <h1 className="text-2xl font-bold text-white text-center mb-6">Recuperar Cuenta</h1>
                    <p className="text-white text-center mb-2">Ingresa tu correo para recibir un código de verificación</p>
                </div>
                <form action="" className="space-y-4">
                    <div className="text-white">
                        <div>
                        <label className="block mb-1" htmlFor="usuario">Correo</label>
                            <input
                                id="usuario"
                                className="mb-3 bg-slate-700 border border-slate-600 rounded w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Enviar Código
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <a href="/login" className="text-blue-500 hover:underline mr-4">Iniciar Sesión</a>
                    <a href="/crear_cuenta" className="text-blue-500 hover:underline">Crear Cuenta</a>
                </div>
            </div>
        </div>
    </>
  )
}

export default OlvidePassword;
