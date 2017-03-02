<?php
/* Smarty version 3.1.30, created on 2017-03-02 19:58:56
  from "Z:\home\ac.net\www\control\01tovar_forma.php" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_58b841405a6bb0_81504888',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'e4ac35308c37c3421bce9b0240363a927307145a' => 
    array (
      0 => 'Z:\\home\\ac.net\\www\\control\\01tovar_forma.php',
      1 => 1488457233,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_58b841405a6bb0_81504888 (Smarty_Internal_Template $_smarty_tpl) {
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
