<?php
/* Smarty version 3.1.30, created on 2017-03-02 20:44:23
  from "Z:\home\ac.net\www\build\templates\01tovar_forma.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_58b84be7330443_45874528',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '94f657ebc12e6638e90722590a697f9ba9261a68' => 
    array (
      0 => 'Z:\\home\\ac.net\\www\\build\\templates\\01tovar_forma.tpl',
      1 => 1488472988,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_58b84be7330443_45874528 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div>
    <p><label for="input_descr">Описание: </label></p>
    <p>
        <input id="input_descr" type="text" size="30" maxlength="30" title="От 1 до 30 символов">
        <span id="span_descr" class="span_msg_err"></span>
    </p>
</div>
<div>
    <p><label for="input_price">Цена: </label></p>
    <p>
        <input id="input_price" type="text" size="10" maxlength="10" title="Цена должна быть положительной">
        <span id="span_price" class="span_msg_err"></span>
    </p> 
</div><?php }
}
