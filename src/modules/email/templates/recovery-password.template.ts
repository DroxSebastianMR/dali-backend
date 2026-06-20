export function recoveryPasswordTemplate(data: { name: string; code: string }) {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Recuperación de contraseña 🔐</h2>

      <p>Hola <b>${data.name}</b>,</p>

      <p>Tu código de recuperación es:</p>

      <div style="
        font-size: 22px;
        font-weight: bold;
        letter-spacing: 4px;
        padding: 10px;
        background: #f3f3f3;
        display: inline-block;
        margin: 10px 0;
      ">
        ${data.code}
      </div>

      <p>Este código expirará en <b>15 minutos</b>.</p>

      <p>Si no solicitaste esto, ignora este mensaje.</p>
    </div>
  `;
}
