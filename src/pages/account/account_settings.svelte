<script>
    export let name;
    export let content;
    export let is_editing;

</script>

<div class="settings">
    <h2>{name}</h2>
    <div class="content">
        <input placeholder={name} value={content} disable={!is_editing}>
    </div>
</div>
<style>
.settings{
    margin: 1 auto;
}
</style>