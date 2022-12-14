"use strict";
const postContainer = document.getElementById("post-container");

const loading = document.querySelector(".loader");

const filter = document.getElementById("filter");
let limit = 3;
let page = 1;

async function getPosts() {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
	);
	const data = await res.json();
	return data;
}
async function showPosts() {
	const posts = await getPosts();

	posts.forEach((el) => {
		const postEl = document.createElement("div");
		postEl.classList.add("post");
		postEl.innerHTML = `
    <div class="number">${el.id}</div>
    <div class="post-title">
      <h2>${el.title}</h2>
      <p class="post-body">${el.body}</p>
    </div>
    `;
		postContainer.appendChild(postEl);
	});
}

function showLoading() {
	loading.classList.add("show");
	setTimeout(() => {
		loading.classList.remove("show");

		setTimeout(() => {
			page++;
			showPosts();
		}, 300);
	}, 1000);
}

function filterposts(e) {
	const term = e.target.value.toUpperCase();

	const posts = document.querySelectorAll(".post");
	posts.forEach((post) => {
		const title = post.querySelector(".post-title").innerText.toUpperCase();
		const body = post.querySelector(".post-body").innerText.toUpperCase();

		if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
			post.style.display = "flex";
		} else {
			post.style.display = "none";
		}
	});
}

showPosts();

window.addEventListener("scroll", () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	if (scrollTop + clientHeight >= scrollHeight - 5) {
		showLoading();
	}
});

filter.addEventListener("input", filterposts);
