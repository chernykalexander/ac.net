<!DOCTYPE html>
<html>

    <head>

        {include file='head.tpl'}

    </head>

    <body>        

        {include file='header.tpl'}

        <div class="MainClass">


            {include file='sidebar.tpl'}
    
         
            <div class="ContentClass">            

            <h1>Структура базы данных</h1>

            <p>               
               <img id="ImgStructira" src="img/shema_struct2.png" align="center" alt="Структура базы данных">
            </p>

            <!-- This text -->
            {$main_text}

            </div>

        </div>        
        {include file='footer.tpl'}
    </body>
</html>