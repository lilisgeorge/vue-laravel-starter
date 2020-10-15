<?php

namespace App\Http\Controllers;

use App\Http\Requests\VerifyEmailRequest;
use Illuminate\Auth\Events\Verified;

class VerifyEmailController extends controller
{
    public function __invoke(VerifyEmailRequest $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->noContent();
        }

        if ($request->user()->markEmailAsVerified()) {
             event(new Verified($request->user()));
        }

        return response()->json($request->user());
    }
}
