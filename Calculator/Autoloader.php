<?php
/**
 * Created by PhpStorm.
 * User: Rienk84
 * Date: 15-10-2014
 * Time: 10:41
 */

class Autoloader {
    static  public function loader($className){
        $filename = str_replace('\\','/', $className).".php";
        if(file_exists($filename)){
            include_once($filename);
            if(class_exists($className)){
                return TRUE;
            }
        }
        return FALSE;
    }
}

spl_autoload_register('Autoloader::loader');