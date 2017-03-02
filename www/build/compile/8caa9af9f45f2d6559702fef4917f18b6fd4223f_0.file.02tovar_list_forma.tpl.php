<?php
/* Smarty version 3.1.30, created on 2017-03-02 20:44:22
  from "Z:\home\ac.net\www\build\templates\02tovar_list_forma.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_58b84be62eb802_94419623',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8caa9af9f45f2d6559702fef4917f18b6fd4223f' => 
    array (
      0 => 'Z:\\home\\ac.net\\www\\build\\templates\\02tovar_list_forma.tpl',
      1 => 1488472937,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_58b84be62eb802_94419623 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div>
    <p><label for="select_magazine">Справочник магазинов: </label></p>
    <p> 
        <select size="1" id="select_magazine">
        <option value="none" selected disabled>Выберите магазин</option>
    
        <?php echo $_smarty_tpl->tpl_vars['select_magazine']->value;?>


    </select>
    <span id="span_magazine" class="span_msg_err"></span>
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
</div><?php }
}
