// Função para alternar modo
function alternarModo(button) {
  document.body.classList.toggle('claro');

  // Salva o estado (claro ou escuro) no localStorage pra nao mudar a cada reload da página
  if (document.body.classList.contains('claro')) {
    localStorage.setItem('modo', 'claro');
    button.textContent = '"Modo Escuro"';
  } else {
    localStorage.setItem('modo', 'escuro');
    button.textContent = '"Modo Claro"';
  }
}

// Executa ao carregar a página pra aplicar o modo salvo
window.addEventListener('DOMContentLoaded', () => {
  const modo = localStorage.getItem('modo');
  const btn = document.getElementById('modoBtn');

  if (modo === 'claro') {
    document.body.classList.add('claro');
    btn.textContent = '"Modo Escuro"';
  } else {
    btn.textContent = '"Modo Claro"';
  }

const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Enviando...";

    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
    };

    try {

        const response = await fetch("/contato", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        alert(result.mensagem);

        form.reset();

    } catch (error) {

        alert("Erro ao enviar mensagem.");

    } finally {

        submitBtn.disabled = false;
        submitBtn.innerText = "Enviar mensagem";

    }

});
  
});


/* 
----- COMENTÁRIOS ADICIONAIS -----

*/