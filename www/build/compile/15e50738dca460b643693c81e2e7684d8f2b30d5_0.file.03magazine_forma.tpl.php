<?php
/* Smarty version 3.1.30, created on 2017-03-02 22:56:59
  from "Z:\home\ac.net\www\build\templates\03magazine_forma.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_58b86afbe6fb15_42763802',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '15e50738dca460b643693c81e2e7684d8f2b30d5' => 
    array (
      0 => 'Z:\\home\\ac.net\\www\\build\\templates\\03magazine_forma.tpl',
      1 => 1488480973,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_58b86afbe6fb15_42763802 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div>                
    <p><label for="input_descr">Описание: </label></p>
    <p>
        <input id="input_descr" type="text" size="50" maxlength="50" title="От 1 до 50 символов">
        <span id="span_descr" class="span_msg_err"></span>
    </p>
</div>
<div>
    <p><label for="input_adresphone">Адрес и телефон: </label></p>
    <p>
        <input id="input_adresphone" type="text" size="40" maxlength="40" title="От 1 до 40 символов">
        <span id="span_adresphone" class="span_msg_err"></span>
    </p> 
</div><?php }
}
