<div>
    <p><label for="select_magazine">Справочник магазинов: </label></p>
    <p> 
        <select size="1" id="select_magazine">
        <option value="none" selected disabled>Выберите магазин</option>
    
        {$select_magazine}

    </select>
    <span id="span_magazine" class="span_msg_err"></span>
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