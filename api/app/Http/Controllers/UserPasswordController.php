<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserPasswordController extends Controller
{
    public function update(Request $request)
    {
        Validator::make($request->all(), [
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ])->after(function ($validator) use ($request) {
            if (! Hash::check($request->input('current_password'), $request->user()->password)) {
                $validator->errors()->add('current_password', __('The provided password does not match your current password.'));
            }
        })->validate();

        $request->user()->forceFill([
            'password' => Hash::make($request->input('password')),
        ])->save();

        return response()->json('');
    }
}
