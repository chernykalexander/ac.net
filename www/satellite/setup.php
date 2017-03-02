<?php 

//  Подключаем смарти
require( 'lib/smarty/Smarty.class.php' ); 

$smarty = new Smarty();

// Занаследуемся от смарти
class ClassMagazine extends Smarty { 
// class ClassMagazine extends Smarty { 

    // Конструктор класса. Он автоматически вызывается при создании нового экземпляра.
    public function __construct() {      
        
        // Вызываем родительский конструктор
        parent::__construct(); 
        
        // Установим рабочие директории в смарти
        parent::setTemplateDir ( 'build/templates/' ); 
        parent::setCompileDir  ( 'build/compile/' ); 
        parent::setConfigDir   ( 'build/configs/' ); 
        parent::setCacheDir    ( 'build/cache/' ); 
        
        // Включаем/выключаем кэш смарти
        $this->caching = false; 
        
        // Определяем время жизни кэша
        $this->cache_lifetime = 10;

        parent::assign( 'page_title', 'Справочник товаров' ); 
        // $this->assign('app_name', 'Система управления магазином');
    }

    // Установки для доступа к БД
    private $dbHost = 'localhost';
    private $dbUser = 'user_magazine';
    private $dbPass = 'line9dom5';
    private $dbName = 'db_magazine';

    // Коннектор отвечает за подключение к серверу MySQL
    private $ConnectorDB;

    // Содержит ошибки БД
    private $MsgErrorDB = '';

    // Текст запроса SQL
    private $QueryDB = '';


    // Подключение к БД
    public function ConnectDB() {

        // global $ConnectorDB;
        // Пытаемся подключиться к БД
        $this->ConnectorDB = new mysqli( 
            $this->dbHost, 
            $this->dbUser, 
            $this->dbPass, 
            $this->dbName );
        
        if ( $this->ConnectorDB->connect_errno ) {
            // 
            $MsgErrorDB = 'Не удалось подключиться к MySQL: (' 
            . $this->ConnectorDB->connect_errno . ') ' 
            . $this->ConnectorDB->connect_error;
            // echo $this->$MsgErrorDB;
        };

        // Устанавливаем кодировку для БД
        $this->ConnectorDB->query( 'SET NAMES \'utf8\'' );
        $this->ConnectorDB->query( 'SET CHARACTER SET \'utf8\'' );
        $this->ConnectorDB->query( 'SET SESSION collation_connection = \'utf8_general_ci\'' );
    }


    // Отключение от БД
    public function DisconnectDB() {
        
        $this->ConnectorDB->close();

    }


    // Сеттер SQL запроса
    public function SetQueryDB( $InputQuery ) {
        
        $this->QueryDB = $InputQuery;

    }


    // Геттер SQL запроса
    public function GetQueryDB() {
        
        $this->assign( 'text_query', '<pre class="code">' . $this->QueryDB . '</pre>' );
        // return '<pre class="code">' . $this->QueryDB . '</pre>';

    }


    // Выполняет запрос к БД и возвращает html-таблицу
    public function GetTable() {
        
        // Выполняем запрос к БД и записываем результат 
        $ResultQuery = $this->ConnectorDB->query( $this->QueryDB );

        // Открываем таблицу
        $ResultTable = 
            '<table id="dbtable" width="100%" cellspacing="0" border="1"> ' .
            '<tbody> ' .
            '<tr> ';
        
        // Формируем шапку
        for ( $i = 0; $i < $ResultQuery->field_count; $i++ ) {
            $ResultTable .= '<th>' . $ResultQuery->fetch_field()->name . '</th>';
        };
        
        $ResultTable .=  '</tr> ';


        // Формируем тело таблицы
        // Переход к заданной строке в результирующем наборе
        $ResultQuery->data_seek( 0 );
        
        // Для каждой итерации цикла 
        // извлекаем одну строку из результирующего набора и помещает ее в обычный массив
        while ( $RowTable = $ResultQuery->fetch_array( MYSQLI_NUM ) ) 
        {
            $ResultTable .=  '<tr>';
            
            // Формируем ячейки для строки
            for ( $i = 0; $i <  count( $RowTable ); $i++ ) {
                $ResultTable .= '<td>' . $RowTable[ $i ] . '</td>';
            };
            
            $ResultTable .= '</tr>';
        }

        // Закрываем таблицу
        $ResultTable .=  
            '</tr> ' .
            '</tbody> ' .
            '</table> ' ;

        // очищаем результаты выборки 
        $ResultQuery->free();

        // Связываем переменную шаблона с таблицей
        $this->assign( 'main_table', $ResultTable );

        // // Возвращем сформированную таблицу
        // return $ResultTable;
    }


    // -----------------------------------------------------------------------------------
    // Управление формами
    // -----------------------------------------------------------------------------------


    // Получить html-текст управляющей формы
    public function GetFormControl() {
        // 
        // $this->assign( 'form_control', $ResultTable );
        $this->assign( 'form_control', file_get_contents( 'build/templates/form_control.tpl' ) );
    }
    
    
    // Получить шапку диалоговой формы
    public function GetFormDialogHeader() {

        $this->assign( 'form_dialog_header', file_get_contents( 'build/templates/form_dialog_header.tpl' ) );

    }
    

    // Получить подвал диалоговой формы
    public function GetFormDialogFooter() {

        $this->assign( 'form_dialog_footer', file_get_contents( 'build/templates/form_dialog_footer.tpl' ) );

    }
    

}; // Конец объявления класса ClassMagazine 


?>