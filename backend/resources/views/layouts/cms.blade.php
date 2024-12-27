@extends("layouts.default")
@section("title", "CMS")

@section("content")
    <div class="flex h-screen">
        <nav class="fixed h-full w-1/5 bg-slate-800">
            <div class="flex text-xl justify-between">
                <span class="p-3">Signed in as <b>{{ Auth::user()->username }}</b></span>
                <a href="{{ route("cms.logout") }}" class="p-3">Sign-out</a>
            </div>
            <ul>
                <li>Dashboard</li>
                <li>Settings</li>
            </ul>
        </nav>
        <div class="ml-[20%] w-4/5">
            @yield("view")
        </div>
    </div>
@endsection