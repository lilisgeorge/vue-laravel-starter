<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserProfileInformationController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($request->user()->id),
            ],
        ]);

        if ($request->input('email') !== $request->user()->email) {
            $this->updateAndVerify($request->user(), $request->only('name', 'email'));
        } else {
            $request->user()->update([
                'name' => $request->input('name'),
            ]);
        }

        return response()->json($request->user());
    }

    protected function updateAndVerify(User $user, array $input)
    {
        $user->forceFill([
            'name' => $input['name'],
            'email' => $input['email'],
            'email_verified_at' => null,
        ])->save();

        $user->sendEmailVerificationNotification();
    }
}
