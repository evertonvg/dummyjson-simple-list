<template>
  <footer class="footer has-background-light py-6">
    <div class="container">
      <div class="columns is-variable is-8">
        <!-- Links úteis -->
        <div class="column">
          <p class="title is-6">Links</p>
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Produtos</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>

        <!-- Suporte / Ajuda -->
        <div class="column">
          <p class="title is-6">Suporte</p>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Termos de Serviço</a></li>
            <li><a href="#">Ajuda</a></li>
          </ul>
        </div>

        <!-- Redes sociais -->
        <div class="column">
          <p class="title is-6">Siga-nos</p>
          <div class="buttons">
            <a class="button is-dark" href="#" aria-label="Facebook">
              <span class="icon"><i class="fab fa-facebook-f is-light"></i></span>
            </a>
            <a class="button is-dark" href="#" aria-label="Instagram">
              <span class="icon"><i class="fab fa-instagram"></i></span>
            </a>
            <a class="button is-dark" href="#" aria-label="Twitter">
              <span class="icon"><i class="fab fa-twitter"></i></span>
            </a>
            <a class="button is-dark" href="#" aria-label="LinkedIn">
              <span class="icon"><i class="fab fa-linkedin-in"></i></span>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="content has-text-centered mt-4">
        <p>© 2026 Dummy json tests. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Componente totalmente genérico, sem props
</script>

<style scoped>
.footer a {
  color: #4a4a4a;
  transition: color 0.2s;
}

.footer a:hover {
  color: #3273dc; /* Azul Bulma */
}

.buttons .button {
  border-radius: 50%;
}
</style>