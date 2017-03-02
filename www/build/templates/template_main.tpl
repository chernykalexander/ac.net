<!DOCTYPE html>
<html>

    <head>

        {* Шаблон шапки документа *}
        {include file='head.tpl'}

        <script src="{$scriptjs}"></script>        

    </head>

    <body>        

        {* Подключаем шаблон шапки страницы *}
        {include file='header.tpl'}

        <div class="MainClass">

            {* Подключаем шаблон меню *}
            {include file='sidebar.tpl'}
    
         
            <div class="ContentClass">            

                {* Заголовок контента *}
                <h1>{$page_title}</h1>

                {* Главная таблица *}
                {$main_table}
                
                {* Текст запроса *}
                {$text_query}
                
                {* Выводим управляющую форму *}
                {$form_control}
                
                                
                {*if $form_dialog_element != ''*}
                    
                    {* Выводим ШАПКУ диалоговой формы *}
                    {$form_dialog_header}

                    {* Выводим элементы диалоговой формы *}
                    {$form_dialog_element}
                    
                    {* Выводим ПОДВАЛ управляющей формы *}
                    {$form_dialog_footer}

                {*/if*}


                {* Основной описательный текст страницы *}
                {$main_text}

            </div>

        </div>

        {* Подключаем шаблон с подвалом *}
        {include file='footer.tpl'}

    </body>
</html>