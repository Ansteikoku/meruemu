import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "YOUR_URL";
const supabaseKey = "YOUR_KEY";
export const db = createClient(supabaseUrl, supabaseKey);

export async function loadBoards(){
  const { data } = await db.from("boards").select("*");
  const box = document.getElementById("boardList");
  box.innerHTML = data.map(b => 
    `<div><a href='board.html?id=${b.id}'>${b.name}</a></div>`).join("");
}

export async function loadThreads(board){
  const { data } = await db.from("threads").select("*").eq("board_id", board);
  document.getElementById("threadList").innerHTML =
    data.map(t=>`<div><a href='thread.html?id=${t.id}'>${t.title}</a></div>`).join("");
}

export async function createThread(board){
  const title = document.getElementById("newThread").value;
  await db.from("threads").insert({board_id: board, title});
  loadThreads(board);
}

export async function loadPosts(thread){
  const { data } = await db.from("posts").select("*").eq("thread_id",thread).order("id");
  const box = document.getElementById("postList");
  box.innerHTML = data.map(p=>`
    <div class='res'><b>${p.id} 名前：${p.name}</b><br>${p.body}<br>
    ${p.image_url ? `<img src='${p.image_url}' style='max-width:200px;'>` : ""}
    </div>`).join("");
}

export async function postRes(thread){
  const name = document.getElementById("name").value || "名無しさん";
  const body = document.getElementById("body").value;
  const file = document.getElementById("image").files[0];
  let imageUrl = null;

  if(file){
    const fname = `img_${Date.now()}.jpg`;
    await db.storage.from("bbs-images").upload(fname, file);
    const { data } = db.storage.from("bbs-images").getPublicUrl(fname);
    imageUrl = data.publicUrl;
  }

  await db.from("posts").insert({thread_id:thread,name,body,image_url:imageUrl});
  loadPosts(thread);
}
