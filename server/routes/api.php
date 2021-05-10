<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::post("/uploadImage", function (Request $req) {
    $validate = $req->validate([
        "image" => "required|mimetypes:image/*"
    ]);

    if (!$validate) {
        return json_encode(["status" => "fail"]);
    }

    $img = $req->image;
    $imgPath = time() . $img->getClientOriginalName();
    $path = $img->storeAs("public/images", $imgPath);

    return json_encode(["status" => "success", "image" => Storage::url($path)]);
});

Route::get("/listImages", function () {
    $filesUrl = [];
    foreach (Storage::allFiles("public/images") as $file) {
        array_push($filesUrl, Storage::url($file));
    }
    return json_encode($filesUrl);
});

Route::delete("/deleteAllImages", function () {
    Storage::delete(Storage::allFiles("public/images"));
    return  json_encode(["status" => "success"]);
});
