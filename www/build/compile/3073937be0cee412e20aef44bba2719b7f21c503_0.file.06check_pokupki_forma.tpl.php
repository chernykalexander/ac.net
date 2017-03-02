<?php
/* Smarty version 3.1.30, created on 2017-03-02 23:25:40
  from "Z:\home\ac.net\www\build\templates\06check_pokupki_forma.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_58b871b45c1037_88651988',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3073937be0cee412e20aef44bba2719b7f21c503' => 
    array (
      0 => 'Z:\\home\\ac.net\\www\\build\\templates\\06check_pokupki_forma.tpl',
      1 => 1488482699,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_58b871b45c1037_88651988 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div>                
    <p><label for="select_pokupki">Таблица покупок: </label></p>
    <p> 
       <select size="1" id="select_pokupki">
       <option value="none" selected disabled>Выберите покупку</option>

       <?php echo $_smarty_tpl->tpl_vars['select_pokupki']->value;?>


    </select>
    <span id="span_pokupki" class="span_msg_err"></span>
    </p>
</div>

<div>                
    <p><label for="select_tovar">Справочник товаров: </label></p>
    <p> 
       <select size="1" id="select_tovar">
       <option value="none" selected disabled>Выберите товар</option>
       
       <?php echo $_smarty_tpl->tpl_vars['select_tovar']->value;?>

    
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
</div><?php }
}
