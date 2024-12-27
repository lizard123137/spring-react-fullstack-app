@extends("layouts.default")
@section("title", "Login")

@section("content")
    <main class="flex items-center justify-center">
        <form
            class="bg-slate-700 p-10 rounded-3xl"
            method="POST"
            action="{{route("cms.login")}}">
            @csrf
            <div>
                <input
                    class="input"
                    type="text"
                    name="email"
                    placeholder="email"
                    id="email"
                    required/>
                <input
                    class="input"
                    type="password"
                    name="password"
                    placeholder="password"
                    id="password"
                    required/>
                <input
                    class="btn-primary"
                    type="submit"
                    value="Sign-in"/>
            </div>
            @if ($errors->has('email'))
                <span class="text-red">{{ $errors->first('email') }}</span>
            @endif
            @if ($errors->has('password'))
                <span class="text-red">{{ $errors->first('password') }}</span>
            @endif
        </form>
    </main>
@endsection