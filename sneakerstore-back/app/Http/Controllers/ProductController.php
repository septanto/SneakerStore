<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    function GetAllProduct() {
        $productList = DB::select(
            'select p.id, p.name, p.unit_price, pi.image
            from product p
            join product_image pi on p.id = pi.product_id
            where pi.default = 1
            limit 3'
        );

        return response()->json($productList, 200);
    }
}
