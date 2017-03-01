<!DOCTYPE html>
<html>

    <head>

        {include file='head.tpl'}

        <script src="{$scriptjs}"></script>        

    </head>

    <body>        

        {include file='header.tpl'}

        <div class="MainClass">


            {include file='sidebar.tpl'}
    
         
            <div class="ContentClass">            

            <h1>{$page_title}</h1>

            
            {$main_text}

            </div>

        </div>        
        {include file='footer.tpl'}
    </body>
</html>