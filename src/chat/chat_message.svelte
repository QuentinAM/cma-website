<script>
    export let message_class;
    export let message_text;
    export let message_date;
    export let author;
    export let photo_url;
</script>

<div class={message_class}>
    <!-- <img src={photo_url} alt=""/> -->
    <p class="message">{message_text}</p>
    <p class="date">{message_date}</p>
    <p class="author">{author}</p>
</div>

<style>
p.date{
  width: fit-content;
  font-size: 0.8em;
  color: #999;
  border: none;
}

p.author{
  width: fit-content;  
  font-size: 0.8em;
  color: #999;
  border: none;
}

p.message {
  width: fit-content;
  margin-bottom: 12px;
  line-height: 24px;
  padding: 10px 20px;
  border-radius: 25px;
  position: relative;
  color: white;
  text-align: center;
}

.message {
  display: flex;
  align-items: center;
}

.sent {
  flex-direction: row-reverse;
}

.sent p {
  color: white;
  background: #0b93f6;
  align-self: flex-end;
}
.received p {
  background: #e5e5ea;
  color: black;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 2px 5px;
}

</style>