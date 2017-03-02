<?php
/* Smarty version 3.1.30, created on 2017-03-02 13:53:19
  from "Z:\home\ac.net\www\build\templates\template_main.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_58b7eb8f0f61b9_52455442',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '0cd1ad99519c39acb16a84558f9b0a0323c5cea1' => 
    array (
      0 => 'Z:\\home\\ac.net\\www\\build\\templates\\template_main.tpl',
      1 => 1488448373,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:head.tpl' => 1,
    'file:header.tpl' => 1,
    'file:sidebar.tpl' => 1,
    'file:footer.tpl' => 1,
  ),
),false)) {
function content_58b7eb8f0f61b9_52455442 (Smarty_Internal_Template $_smarty_tpl) {
?>
<!DOCTYPE html>
<html>

    <head>

        
        <?php $_smarty_tpl->_subTemplateRender("file:head.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>


        <?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['scriptjs']->value;?>
"><?php echo '</script'; ?>
>        

    </head>

    <body>        

        
        <?php $_smarty_tpl->_subTemplateRender("file:header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>


        <div class="MainClass">

            
            <?php $_smarty_tpl->_subTemplateRender("file:sidebar.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

    
         
            <div class="ContentClass">            

                
                <h1><?php echo $_smarty_tpl->tpl_vars['page_title']->value;?>
</h1>

                
                <?php echo $_smarty_tpl->tpl_vars['main_table']->value;?>

                
                
                <?php echo $_smarty_tpl->tpl_vars['text_query']->value;?>

                
                
                <?php echo $_smarty_tpl->tpl_vars['form_control']->value;?>


                
                <?php echo $_smarty_tpl->tpl_vars['main_text']->value;?>


            </div>

        </div>

        
        <?php $_smarty_tpl->_subTemplateRender("file:footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>


    </body>
</html><?php }
}
