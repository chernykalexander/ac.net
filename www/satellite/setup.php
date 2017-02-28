<?php 

//  Подключаем смарти
require( 'lib/smarty/Smarty.class.php' ); 

// Занаследуемся от смарти
class ClassMagazine extends Smarty{ 

    // Конструктор класса. Он автоматически вызывается при создании нового экземпляра.
    public function __construct() {      
        
        // Вызываем родительский конструктор
        parent::__construct(); 
        
        # Установим рабочие директории в смарти
        parent::setTemplateDir ( 'build/templates/' ); 
        parent::setCompileDir  ( 'build/compile/' ); 
        parent::setConfigDir   ( 'build/configs/' ); 
        parent::setCacheDir    ( 'build/cache/' ); 
        
        # Включаем/выключаем кэш смарти
        $this->caching = false; 
        
        # Определяем время жизни кэша
        $this->cache_lifetime = 10; 
        $this->assign('app_name', 'Система управления магазином');
    } 
} 


?>