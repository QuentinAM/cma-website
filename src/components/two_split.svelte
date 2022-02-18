<script>
    export let color = "white";
    export let title;
    export let texts;
    export let img_src;
    export let img_style = "";
</script>

<section class="theme container-flex cols-2-split split-image-right"
         style="--theme-color: {color};">
    <div class="col-2">
        <h2>{title}</h2>
        {#each texts as text}
            <p>{text}</p>
        {/each}
    </div>

    <div class="col-2">
        <figure><img style={img_style} src={img_src} alt=""></figure>
    </div>
</section>

<style>
.theme{
    background-color: var(--theme-color);;
}
.container-flex { 
    display: flex; 
    justify-content: space-between; 
    flex-wrap: wrap; 
    align-items: stretch;
    width: 100%; 
    padding-left: 2%;
    padding-right: 2%; 
}

/* ============= TWO COLUMNS: SPLIT TEXT AND IMAGE ============ */

.col-2 { background-color: inherit; padding: 20px 20px 20px 20px }

/* Non-mobiles */
@media (min-width: 768px) { 
    .col-2 { width: 47%; margin-bottom: 64px }
    .col-2:nth-last-child(-n+2) { margin-bottom: 0 }
}

/* Mobiles */
@media (max-width: 767px) { 
    .col-2 { 
        width: 100%; 
        max-width: 400px; 
        margin-left: auto; margin-right: auto; 
        margin-bottom: 32px;
    }
}

@media (min-width: 1200px) {
    .col-2 figure { margin-bottom: 32px }
}

@media (min-width: 768px) and (max-width: 1199px) {
    .col-2 figure { margin-bottom: 26px }
}

@media (max-width: 767px) { 
    .col-2 figure { margin-bottom: 20px }
}

/* Column headings */
.cols-2-split .col-2 h2 {
    font-size: calc(24px + (32 - 24) * ((100vw - 320px) / (1140 - 320)));
    font-weight: 700; line-height: 1.15; margin-bottom: 6px;
}

/* Paragraphs and Lists */
.cols-2-split .col-2 p {
    font-size: calc(17px + (20 - 17) * ((100vw - 320px) / (1140 - 320)));
    line-height: 1.5; margin-bottom: 16px;
}

/* Paragraphs and Lists */
.col-2 p {
    font-size: calc(17px + (20 - 17) * ((100vw - 320px) / (1140 - 320)));
    line-height: 1.5; margin-bottom: 16px;
}

/* Desktops/Laptops */
@media (min-width: 1025px) { 
	.cols-2-split { 
        padding: 5% 10% 3% 10%;
	} 
}

/* Tablets */
@media (min-width: 768px) and (max-width: 1024px) { 
    .cols-2-split { 
        padding: 5% 10% 4% 10%;
    }
}
/* Larger mobiles */
@media (min-width: 400px) and (max-width: 767px)  { 
	section.cols-2-split { 
        padding: 9% 13% 6% 13%; 
    } 
}

/* Smaller mobiles */
@media (max-width: 399px) { 
	section.cols-2-split { 
        padding: 12% 10% 8% 10%; 
    } 
}

/* Individual Columns */
.cols-2-split .col-2 {
    display: flex; 
    flex-direction: column; 
    justify-content: center;
    overflow: hidden;
}

/* Non-mobiles */
@media (min-width: 768px) { 
    .cols-2-split .col-2 { width: 47% }
}

/* Mobiles */
@media (max-width: 767px) { 
    .cols-2-split .col-2 { 
        width: 100%; 
        max-width: 400px;
    }
}

/* Column order */
@media (min-width: 768px) {
    .cols-2-split.split-image-right .col-2:nth-child(1) { order: 1; }
    .cols-2-split.split-image-right .col-2:nth-child(2) { order: 2; }
}

/* Column order mobiles, image on top */
@media (max-width: 767px) {
    .cols-2-split .col-2:nth-child(1) { order: 2 }
    .cols-2-split .col-2:nth-child(2) { order: 1 }
}


/* Column headings */
.cols-2-split .col-2 h2 {
    font-size: calc(24px + (32 - 24) * ((100vw - 320px) / (1140 - 320)));
    font-weight: 700; line-height: 1.15; margin-bottom: 6px;
}


/* Paragraphs and Lists */
.cols-2-split .col-2 p {
    font-size: calc(17px + (20 - 17) * ((100vw - 320px) / (1140 - 320)));
    line-height: 1.5; margin-bottom: 16px;
}

/* Figures */
.cols-2-split .col-2 figure { margin-bottom: 0 }
    
</style>
