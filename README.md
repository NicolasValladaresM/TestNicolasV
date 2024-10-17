# Front end test Vita Wallet
## Nicolás Valladares M


## 💿 Instalación

Para instalar las dependencias, utilice el siguiente comando:

| Package Manager                                            | Command        |
| ---------------------------------------------------------- | -------------- |
| [npm](https://docs.npmjs.com/cli/v10/commands/npm-install) | `npm install` |



### Iniciando el servidor de desarrollo

Para iniciar el servidor de desarrollo en hot-reload, ejecute:

```bash
npm run dev
```
El servidor será accesible en [[http://localhost:5173](http://localhost:5173):]

## 💡 Uso

Para iniciar sesión, deberá utilizar las credenciales registradas en el archivo .env.
Actualmente, puede visualizar la página de inicio, la cual muestra los saldos del usuario y el historial de transacciones, ya sea presionando los botones de navegación: inicio, transferir, recargar, perfil o ayuda. También puede acceder al apartado de "intercambiar", donde se mostrará su saldo disponible de acuerdo con la primera moneda seleccionada a la izquierda de los campos tipo input. Puede ingresar un monto, seleccionar el tipo de moneda que utilizará y la que recibirá. Al presionar continuar, será redirigido a la página "resumen", donde podrá ver los datos de la transacción a realizar. Si está de acuerdo, puede hacer clic en intercambiar.

Trasladar dinero para recibir bitcoins suele generar el error "saldo insuficiente para el administrador". En ocasiones, también puede recibir el error de "los balances han caducado". No se ha logrado determinar con precisión la causa de este error. Ambos casos son notificados al usuario, quien podrá realizar otra transferencia que funcione. Al presionar intercambiar, se desplegará un modal con la información final y, al cerrarlo, será redirigido al apartado de inicio.
