<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Product;
use App\ProductImage; 

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

    function SaveProductImage(Request $req) { //take Request as parameter

        DB::beginTransaction();
        try {

        $this->validate($req, [
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',// validasi bahwa image is required, tipe jpg, jpeg, atau png, dan max size 2048 kB 
            'product_id' => 'required'
        ]);

        $productId = $req->input('product_id');
        $image = $req->file('image'); //

        $file_name = time().'.'.$image->getClientOriginalExtension();
        $file_path = '/img/product/' . $productId;
        $file_destination = public_path($file_path);

        $productImage = new ProductImage;
        $productImage->product_id = $productId;
        $productImage->image = $file_path . '/' . $file_name;
        $productImage->default = false;
        $productImage->save();

        DB::commit();

        $image->move($file_destination, $file_name);
        }
        catch(Exception $e) {
            DB::rollback();
        }
    }

    function GetProductById(Request $req) {
        DB::beginTransaction();
        try{
            $this->validate($req, [
                'product_id' => 'required'
            ]);

            $productId = $req->input('product_id');

            // $productList = DB::select(
            //     'select p.id, p.name, p.color, p.unit_price, p.description, pi.image, pi.default, pd.stock, pd.size
            //     from product ps
            //     left join product_image pi on p.id = pi.product_id
            //     left join product_detail pd on p.id = pd.product_id'
            // );

            // $product = DB::selectOne(
            //     'select id, name, unit_price, description
            //     from product
            //     where id = ' . $productId . ' '
            // );
            // -> Rentan SQL INjection

            $product = DB::selectOne(DB::raw('select id, name, unit_price, description
            //     from product
            //     where id = ? '), [$productId]);
            

            if (empty($product)) {
                return response()->json(['message' => 'Product Not Found'], 404);
            }

            // $productDetails = DB::select(
            //     'select id, product_id, size, stock
            //     from product_detail
            //     where product_id = ' . $productId . ' '
            // );

            $productDetails = DB::select(DB::raw('select id, product_id, size, stock
                from product_detail
                where product_id = :pId'), ['pId' => $productId]);

            $productImages = DB::select('
                select *
                from product_image
                where product_id = ' . $productId . ' '
            );

            $product->product_detail = $productDetails;
            $product->product_images = $productImages;

            DB::commit();

            return response()->json($product, 200);
        }
        catch(\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to create user, exception:' + $e], 500);
        }
    }
}
