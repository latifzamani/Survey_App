<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Neighbour extends Model
{
    use HasFactory;
    protected $table='neighbours';
    protected $fillable=['name','lastname','address'];
}
