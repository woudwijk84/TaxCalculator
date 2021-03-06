<?php

/**
 * Created by PhpStorm.
 * User: Rienk84
 * Date: 15-10-2014
 * Time: 12:38
 */

namespace Calculator;

class Machine
{
    public $schijf;
    public $tax;
    public $total;

    public function getTax($inkomen, $studiekosten, $giften, $ziektekosten, $koopwoning)
    {
        $result = array();
        if(!is_numeric($inkomen)){
            header('HTTP/1.1 500 Internal Server Error');
            return array("error" => "Geen geldig inkomen");
        }
        if ($inkomen > 0 && $inkomen <= 19645) {
            $this->schijf = "Schijf 1";
            $this->tax = (($inkomen / 100) * 36.25);
        } else if ($inkomen >= 19646 && $inkomen <= 33363) {
            $this->schijf = "Schijf 2";
            $this->tax = (($inkomen / 100) * 42);
        } else if ($inkomen >= 33364 && $inkomen <= 56531) {
            $this->schijf = "Schijf 3";
            $this->tax = (($inkomen / 100) * 42);
        } else {
            $this->schijf = "Schijf 4";
            $this->tax = (($inkomen / 100) * 52);
        }
        $this->checkStudiekosten($studiekosten);
        $this->checkGiften($giften);
        $this->checkZiektekosten($ziektekosten);
        $this->checkKoopwoning($koopwoning);

        $result['schijf'] = $this->schijf;
        if ($this->total < $this->tax){
           $result['total'] = $this->tax - $this->total;
        } else {
            $result['total'] = 0;
        }

        return $result;
    }

    private function checkStudiekosten($studiekosten)
    {
        if ($studiekosten >= 250 && $studiekosten <= 15000) {
            $this->total -= $studiekosten;
        }
    }

    private function checkGiften($giften)
    {
        $this->total -= $giften;
    }

    private function checkZiektekosten($ziektekosten)
    {
        $this->total -= $ziektekosten;
    }

    private function checkKoopwoning($koopwoning)
    {
        $this->total -= $koopwoning;
    }
}