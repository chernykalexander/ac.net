<div>                
    <p><label for="select_pokupki">Таблица покупок: </label></p>
    <p> 
       <select size="1" id="select_pokupki">
       <option value="none" selected disabled>Выберите покупку</option>

       {$select_pokupki}

    </select>
    <span id="span_pokupki" class="span_msg_err"></span>
    </p>
</div>

<div>                
    <p><label for="select_tovar">Справочник товаров: </label></p>
    <p> 
       <select size="1" id="select_tovar">
       <option value="none" selected disabled>Выберите товар</option>
       
       {$select_tovar}
    
    </select>
    <span id="span_tovar" class="span_msg_err"></span>
    </p>
</div>

<div>
    <p><label for="input_kolichestvo">Количество: </label></p>
    <p>
        <input id="input_kolichestvo" type="text" size="10" maxlength="10" title="Количество товара должно быть положительным числом">
        <span id="span_kolichestvo" class="span_msg_err"></span>
    </p> 
</div>