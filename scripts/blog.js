import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { firebaseConfig } from 'https://brenolobao.github.io/PersonalBlog-v1/config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const listaArtigos = document.getElementById("listaArtigos");

async function carregarArtigos() {
    try {
        const q = query(collection(db, "artigos"), orderBy("dataPublicacao", "desc"));
        const snapshot = await getDocs(q);

        listaArtigos.innerHTML = "";

        if (snapshot.empty) {
            listaArtigos.innerHTML = "<div class='empty-state'><h3>Nenhum artigo encontrado</h3><p>Volte em breve para ver novos conteúdos!</p></div>";
            return;
        }

        let delay = 0;
        snapshot.forEach(doc => {
            const data = doc.data();
            const card = document.createElement("a");
            card.className = "post-card";

            const date = new Date(data.dataPublicacao);
            const formattedDate = date.toLocaleDateString('pt-BR');

            card.innerHTML = `
                        <div class="post-image-container">
                            <img class="post-image" src="${data.cover}" alt="${data.titulo}" loading="lazy">
                        </div>
                        <div class="post-content">
                            <h4 class="post-title">${data.titulo}</h4>
                            <p class="post-excerpt">${data.subtitulo}</p>
                            <div class="post-meta">
                                <span class="post-date">${formattedDate}</span>
                            </div>
                        </div>
                    `;

            listaArtigos.appendChild(card);
            delay += 0.1;
        });

    } catch (error) {
        listaArtigos.innerHTML = `<div class='error-state'><h3>Erro ao carregar artigos</h3><p>Tente recarregar a página</p></div>`;
        console.error("Erro ao carregar os artigos: ", error);
    }
}

carregarArtigos();
