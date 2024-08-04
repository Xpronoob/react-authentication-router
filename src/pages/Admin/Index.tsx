function Index() {
  return (
    <div>
      <div className="grid gap-1 auto-rows-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="bg-red-100 col-span-2">
          <p>Total Users: </p>
          <p>Admin Users: </p>
          <p>Client Users: </p>
          <p>Need Support Users: </p>
        </div>
        <div className="bg-red-200 h-44">2</div>
        <div className="bg-red-300 h-44">3</div>
        <div className="bg-red-400 h-44">4</div>
        <div className="bg-red-100 h-44">5</div>
        <div className="bg-red-200 h-44">6</div>
        <div className="bg-red-300 h-44">7</div>
        <div className="bg-red-400 h-44">8</div>
      </div>
    </div>
  )
}

export default Index
