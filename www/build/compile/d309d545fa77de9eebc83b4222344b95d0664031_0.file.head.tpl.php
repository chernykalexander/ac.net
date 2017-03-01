<?php
/* Smarty version 3.1.30, created on 2017-03-01 11:39:46
  from "Z:\home\ac.net\www\build\templates\head.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_58b67ac297ce70_73008660',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd309d545fa77de9eebc83b4222344b95d0664031' => 
    array (
      0 => 'Z:\\home\\ac.net\\www\\build\\templates\\head.tpl',
      1 => 1488353936,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_58b67ac297ce70_73008660 (Smarty_Internal_Template $_smarty_tpl) {
?>
<meta charset="utf-8">
<!--
    Мета тег X-UA-Compatible управляет режимом отображением страниц в браузерах IE8+.
    IE=edge	всегда использует последний доступный стандартный режим отображения независимо от <!DOCTYPE>.
-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><?php echo $_smarty_tpl->tpl_vars['page_title']->value;?>
</title>
<meta name="description" content="<?php echo '<?php ';?>echo $page_title <?php echo '?>';?>.">
<meta name="keywords" content="магазин, система управления, ERP система">
<link rel="stylesheet" href="css/style.css">
<link rel="icon" type="image/x-icon" href="favicon.ico">
<?php echo '<script'; ?>
 src = "/lib/jquery/jquery-3.1.1.min.js"><?php echo '</script'; ?>
><?php }
}
