BigFichas - Site Institucional e Blog

Projeto desenvolvido para apresentar a empresa **BigFichas**, incluindo páginas institucionais e um **blog** com artigos paginados.  
O foco principal do desenvolvimento foi **Mobile First**, garantindo uma experiência otimizada para usuários de dispositivos móveis, sem perder a qualidade no desktop.



Abordagem Mobile First

O layout foi projetado pensando primeiro em **telas pequenas**, com adaptação progressiva para dispositivos maiores.  
A estratégia utilizada:
- Estruturar primeiro o HTML para **mobile**.
- Aplicar CSS inicial para **smartphones**.
- Utilizar **media queries** para ajustar a interface em **tablets** e **desktops**.
- Garantir **acessibilidade** e navegação fluida em todas as resoluções.

Tecnologias Utilizadas

- **HTML5 semântico** → melhor estruturação do conteúdo e SEO.
- **CSS3** → flexbox e grid layout para organização responsiva.
- **JavaScript** → interações como menu mobile, paginação e navegação.
- **Google Fonts** → tipografia otimizada (Montserrat e Roboto).
- **SVGs otimizados** → ícones e logotipos.
- **Boas práticas de acessibilidade (A11Y)**:
  - Uso de atributos `aria-label`, `role` e `alt`.
  - Elementos interativos com `tabindex`.
  - Contraste adequado entre texto e fundo.


*Funcionalidades*

**Menu Responsivo**:

  * Botão hamburguer para mobile.
  * Navegação clara no desktop.
    
**Blog Paginado**:

  * Exibição de 1 a 6 cards por página.
  * Cada card contém:

    * Data de publicação.
    * Título.
    * Imagem de capa.
    * Resumo com limite de 4 linhas + reticências.
    * Botão "Leia mais".
**Paginação**:

* Navegação entre páginas de artigos.
**Acessibilidade**:

  * Todas as imagens possuem `alt`.
  * Botões e links com `aria-label`.
  * Estrutura semântica com `header`, `main`, `article`, `nav`, `footer`.


Como Executar Localmente

1. *Clonar o repositório*

```bash
git clone https://github.com/usuario/bigfichas.git
```

2. *Abrir o projeto no VS Code*

```bash
cd bigfichas
code .
```

3. *Executar no navegador*

 Abra `index.html` no navegador.
 Para testes mais avançados, utilize a extensão **Live Server**.


Observações Importantes

* Imagens são ilustrativas e podem ser substituídas por versões otimizadas.
* Estrutura preparada para integração com backend (Java, Node.js, etc.).
* Código modular para fácil manutenção e escalabilidade.
