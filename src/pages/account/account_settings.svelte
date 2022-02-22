<script>
    export let name;
    export let content;
    export let disabled;

</script>

<div class="settings">
    <h2>{name}</h2>
    <div class="content">
        <input placeholder={name} value={content} {disabled}>
    </div>
</div>
<style>
.settings{
    margin: 1 auto;
    padding: 1% 0 1% 0;
}
.content{
    width: 20%;
}
input{
    width: 100%;
    padding-right: 4%;
}
</style>