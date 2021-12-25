<script>
    // Get current date information
    let date = new Date();
    let day_number = date.getDate();
    let day = get_day();
    let month = get_month();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    
    // Get day name
    function get_day(){
        let d = date.getDay();
        switch (d) {
            case 0:
                return "Lundi";
            case 1:
                return "Mardi";
            case 2:
                return "Mercredi";
            case 3:
                return "Jeudi";
            case 4:
                return "Vendredi";
            case 5:
                return "Samedi";
            default:
                return "Dimanche";
        }
    }

    // Get month name
    function get_month(){
        let m = date.getMonth();
        switch (m) {
            case 0:
                return "Janvier";
            case 1:
                return "Février";
            case 2:
                return "Mars";
            case 3:
                return "Avril";
            case 4:
                return "Mai";
            case 5:
                return "Juin";
            case 6:
                return "Juillet";
            case 7:
                return "Août";
            case 8:
                return "Septembre";
            case 9:
                return "Octobre";
            case 10:
                return "Novembre";
            default:
                return "Décembre";
        }
    }

    // Get number of day in a month
    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

</script>

<main class="card">
    <section class="card__header">
      <h3>{day} {day_number}</h3>
      <h3>{hour}:{minute}</h3>
      <h3>{month} {year}</h3>
    </section>
    <section class="card__body">
      <ul class="card__body--days">
        <li>LUN</li>
        <li>MAR</li>
        <li>MER</li>
        <li>JEU</li>
        <li>VEN</li>
        <li>SAM</li>
        <li>DIM</li>
      </ul>
      <ul class="card__body--dates">
        <li class="prev">30</li>
        <li class="prev">31</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li class="active">7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li class="circle purple">19 <span>6</span></li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
        <li>31</li>
        <li class="next">1</li>
        <li class="next">2</li>
      </ul>
    </section>
    <div class="card__footer">
      
    </div>
  </main>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul {
    list-style: none;
}

.card {
    background: white;
    width: 90%;
    max-width: 40rem;
    min-height: 40rem;
    margin: 5rem auto;
    display: grid;
    grid-template-rows: 8rem auto 10rem;
    box-shadow: 0 1rem 2.5rem rgb(27, 64, 94);
}
.card .card__header {
        padding: 0 1.25rem;
        color: gray;
        display: flex;
        justify-content: space-between;
        align-items: center;
}

.card .card__body{
    padding: 1.5rem 2rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.card .card__body .card__body--days{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;          
}
.card .card__body .card__body--days li{
    flex: 1;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    color: gray;
    margin: 0 1px;
}

.card .card__body .card__body--dates{
    display: grid;
    gap: 3px;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    text-align: center;
}

.card .card__body .card__body--dates li{
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    font-weight: bold;
    position: relative;
}

.card .card__body .card__body--dates li.prev{
    color: #ccc;
}

.card .card__body .card__body--dates li.next{
    color: #ccc;
}

.card .card__body .card__body--dates li.active{
    background: orange;
    color: white;
    border-radius: 15px;
}

.card .card__body .card__body--dates li.circle{
    border: 2px solid;
    border-radius: 15px;
}

.card .card__body .card__body--dates li.circle span{
    position: absolute;
    top: -0.75rem;
    right: -0.5rem;
    width: 1.75rem;
    height: 1.75rem;
    font-size: 1.2rem;
    color: black;
    border-radius: 15px;
}

.card .card__body .card__body--dates li:hover{
    cursor: pointer;
    background: orange;
    border: 2px solid orange;
    border-radius: 15px;
}

.card .card__body .card__body--dates li:active{
    background: darkgoldenrod;
    border: 2px solid darkgoldenrod;
    color: white;
    border-radius: 15px;
}

.card .card__footer{
    color: black;
    font-weight: bold;
    text-decoration: none;
    color: inherit;
    width: 3.5rem;
    height: 3.5rem;
    padding-top: 0.25rem;
    display: grid;
    place-items: center;
}

</style>